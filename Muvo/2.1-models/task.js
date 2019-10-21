const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	fromStreet: {
		type: String,
		required: true
	},
	fromCity: {
		type: String,
		required: true
	},
  fromState: {
    type: String,
    required: true
  },
	fromZip: {
		type: Number,
		required: true
	},
	toStreet: {
		type: String,
		required: true
	},
	toCity: {
		type: String,
		required: true
	},
	toState: {
		type: String,
		required: true
	},
	toZip: {
		type: Number,
		required: true
	},
	difficulty: {
		type: Number,
		default: 1,
		required: true
	},
	skillsRequired: {
		type: Boolean,
		default: 0,
		required: true
	},
	estimatedTime: {
		type: Number,
		default: 0,
		required: true
	},
	pay: {
		type: Number,
		default: 10,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	user: {
		type: String
	},
	status: {
		type: Number,	// 1 = created, 2 = on work, 3 = complete
		default: 1
	}
});

module.exports = mongoose.model('Task', userSchema);
