'use strict';
var express = require('express');
var router = express.Router();

const tasks = require('../1.2-controllers/tasks');
const isAuthorized = require('../1.3-middlewares/is-authorized');

router.post(
	'/tasks', 
	isAuthorized, 
	tasks.addTask
);
router.get(
	'/tasks',
	isAuthorized,
	tasks.getTasks
);

module.exports = router;
