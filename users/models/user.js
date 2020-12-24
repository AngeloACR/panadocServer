const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const Schema = require('mongoose').Schema;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    mail: {
        type: String
    },
    avatarSrc: {
        type: String,
    },
    validToken: {
        type: String,
    },
    validTime: {
        type: Number,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: { type: Date, default: Date.now },
});



const User = module.exports = mongoose.model("User", userSchema);

module.exports.comparePass = async function (candidatePassword, password) {
    try {
        return await bcrypt.compare(candidatePassword, password);
    } catch (error) {
        throw error;
    }
}
module.exports.hashPass = async function (password) {
    try {
        let salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw error;
    }
}
module.exports.genToken = function (username) {
    try {
        const hash = crypto.createHash('sha1');

        var hrTime = process.hrtime();
        var validTime = hrTime[0] * 1000000 + hrTime[1] / 1000

        var toHash = username + validTime.toString() + environment.vSecret;
        hash.update(toHash);
        return [hash.digest('hex'), validTime]
    } catch (error) {
        throw error;
    }
}

module.exports.addUser = async function (newUser) {
    try {
        let user = await this.findOne({ "mail": newUser.mail });
        if (user) {
            throw new Error('El correo ya se encuentra registrado');
        } else {
            user = await this.findOne({ "username": newUser.username });
            if (user) {
                throw new Error('Nombre de usuario no disponible');
            } else {
                newUser.password = await this.hashPass(newUser.password);
                user = await newUser.save();
                let response = {
                    status: true,
                    values: user
                }
                return response
            }
        }
    } catch (error) {
        let response = {
            status: false,
            msg: error.toString().replace("Error: ", "")
        }
        return response
    }
}

module.exports.updatePassword = async function (username, password) {
    try {
            let user = await this.findOne({ "username": newUser.username });
            user.password = await this.hashPass(password);
            user = await newUser.save();
            let response = {
                status: true,
                values: user
            }
    }
     catch (error) {
        throw error;
    }
}

module.exports.authUser = async function (username, password) {
    try {
        const query = { "username": username };
        let user = await this.findOne(query)
        .populate('patientId')
        .populate('doctorId')
        .populate('adminId')
        if (!user) {
            throw new Error("No existe ese nombre de usuario")
        }
        let isMatch = await this.comparePass(password, user.password)
        let auth = {}
        if (isMatch) {
            const token = jwt.sign(user.toJSON(), environment.authSecret, {
                expiresIn: 604800 //1 week
            });
            auth = {
                status: true,
                token: token
            }
        } else {
            throw new Error('Contraseña inválida')
        }
        return auth;
    } catch (error) {
        let response = {
            status: false,
            msg: error.toString().replace("Error: ", "")
        }
        return response
    }
}
module.exports.deleteUser = async function (username) {
    try {
        const query = { "username": username };
        let user = await this.findOne(query)
        .populate('adminId')
        .populate({ path: 'doctorId', populate: 'appointmentsId'})
        .populate({path: 'patientId', populate: 'appointmentsId'})            
        let appointments
        switch (user.type) {
            case 'Admin':
                user.adminId.remove();
                appointments = user.patientId.appointmentsId
                for(let appointment of appointments){
                    await appointment.remove();
                };
                user.patientId.remove()
                break;        
            case 'Paciente':
                
                appointments = user.patientId.appointmentsId
                for(let appointment of appointments){
                    await appointment.remove();
                };
                user.patientId.remove()
                break;
        
            default:

                appointments = user.doctorId.appointmentsId
                for(let appointment of appointments){
                    await appointment.remove();
                };
                user.doctorId.remove()
                break;
        }
        let result = await user.remove();
        let response = {
            status: true,
            values: result
        }
    } catch (error) {
        throw error;
    }
}
module.exports.updateUser = async function (data) {
    try {
        const query = { '_id': data.id }
        let user = await this.findOne(query);
        user.name = data.name;
        user.avatarSrc = data.avatarSrc;
        user.phone = data.phone;
        user = await user.save();
        let response = {
            status: true,
            values: user
        }
        return response

    } catch (error) {
        throw error;
    }
}
module.exports.getUser = async function (uid) { //Need tons of work
    try {
        const query = { '_id': uid }
        let user = await this.findOne(query);
        let response = {
            status: true,
            values: user
        }
        return response
    } catch (error) {
        throw error;
    }
}
module.exports.getUsers = async function () { //Need tons of work
    try {
        const query = {};
        let users = await this.find(query).select('username type -_id');
        let response = {
            status: true,
            values: users
        }
        return response
    } catch (error) {
        throw error;
    }
}
module.exports.setToken = async function (username) {
    try {
        let tokenData = this.genToken(username);
        const query = { username: username };
        let user = await this.findOneAndUpdate(
            query, {
                $set: {
                    "validEmail": false,
                    "validToken": tokenData[0],
                    "validTime": tokenData[1]
                }
            });
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports.validateUser = async function (username, token) {
    try {
        const hrTime = process.hrtime();
        const thisTime = hrTime[0] * 1000000 + hrTime[1] / 1000
        const maxTime = 3600 * 8 * 1000000;
        const query = { "username": username };

        let user = await this.findOne(query);

        if (thisTime - user.validTime < maxTime) {
            if (user.validToken == token) {
                user = await this.findOneAndUpdate(
                    query, {
                        $set: {
                            "validEmail": true,
                        }
                    });
                return user;
            } else {
                throw new Error('Wrong token');
            }
        } else {
            throw new Error('Token has expired');
        }

    } catch (error) {
        throw error;
    }
}