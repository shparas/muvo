const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
  zip: {
    type: Number,
    required: true
  },
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
  pass: {
    type: String,
    required: true
  },
	authorizationLevel: {
		type: Number,
		default: 1,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);
