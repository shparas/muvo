const Task = require('../2.1-models/task');

exports.addTask = (req, res, next) => {
	const task = new Task({
		description: req.body.description,
		date: req.body.date,
		time: req.body.time,
		fromStreet: req.body.fromStreet,
		fromCity: req.body.fromCity,
		fromState: req.body.fromState,
		fromZip: req.body.fromZip,
		toStreet: req.body.toStreet,
		toCity: req.body.toCity,
		toState: req.body.toState,
		toZip: req.body.toZip,
		difficulty: req.body.difficulty,
		skillsRequired: req.body.skillsRequired,
		estimatedTime: req.body.estimatedTime,
		pay: req.body.pay,
		timeStamp: Date.now(),
		user: req.session.email
	});

	return task.save().then(result => {
		console.log("SAVED!");
		res.redirect('/');
	});
	console.log("hello");
}
	

exports.getTasks = (req, res, next) => {
}