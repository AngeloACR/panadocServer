const mongoose = require('mongoose');
const config = require('../../config/database');
const Schema = require('mongoose').Schema;

// Medical History Schema
const MHSchema = mongoose.Schema({
	doctorId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Doctor',
	},
	patientId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Patient',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	info: {
		type: String,
		required: true,
	},
	symptoms: {
		type: String,
		required: true,
		//    ref: 'Symptoms',
	}
	/*  chatsId: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Chat'
	  }],*/
});

const mh = module.exports = mongoose.model('mh', MHSchema, 'mh');

module.exports.getMH = function (patient, callback) {
	const query = { patient: patient };
	mh.findOne(query, callback);
};

module.exports.addInfo = function (patient, info, callback) {
	const query = { patient: patient };
	mh.findOneAndUpdate(query,
		{
			$push: {
				"info": info
			}
		},
		callback);
};

module.exports.createMH = function (newMH, callback) {
	newMH.save(callback);
};

