const mongoose = require('mongoose');
const config = require('../../config/database');

// Move Schema
const CompanySchema = mongoose.Schema({
	name: {
  		type: String
	},
	users: [{
		type: String
	}],
	roles: [{
		type: String
	}],
});

const company = module.exports = mongoose.model('company', CompanySchema, 'company');

module.exports.getInfo = function(callback){
	const query = {};
	company.findOne(query, callback);
};

module.exports.updateUsers = function(user, callback){
	const query = {};
	company.findOneAndUpdate(query, 
    {  $push: { 
    	"users": user  
    }},
	callback);
};

module.exports.removeUser = function(user, callback){
	const query = {};
	company.findOneAndUpdate(query,
    {  $pull: {
    	"users": user
    }},
	callback);
};

module.exports.updateRoles = function(role, callback){
	const query = {};
	company.findOneAndUpdate(query, 
    {  $push: { 
    	"roles": role  
    }},
	callback);
};

module.exports.removeRole = function(role, callback){
	const query = {};
	company.findOneAndUpdate(query,
    {  $pull: {
    	"roles": role
    }},
	callback);
};

