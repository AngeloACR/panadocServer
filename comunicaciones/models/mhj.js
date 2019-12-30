const mongoose = require('mongoose');
const config = require('../../config/database');

// Medical History Schema
const MHJSchema = mongoose.Schema({
	patient: String,
	info: [{
        doctor: String,
        diagnosis: [String],
    }],
});

const mh = module.exports = mongoose.model('mhj', MHJSchema, 'mhj');

module.exports.getMH = function(patient, callback){
	const query = {patient: patient};
	mh.findOne(query, callback);
};

module.exports.addInfo = function(patient, info, callback){
	const query = {patient: patient};
	mh.findOneAndUpdate(query, 
    {  $push: { 
    	"info": info  
    }},
	callback);
};

module.exports.createMH = function(newMH, callback){
	newMH.save(callback);
};

