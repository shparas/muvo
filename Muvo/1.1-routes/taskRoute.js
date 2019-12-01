// handles requests to task in API, post and get works now

'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const tasks = require('../1.2-controllers/taskController');
const isAuthorized = require('../1.3-middlewares/is-authorized');

router.post(
	'/api/tasks', 
    isAuthorized,
    bodyParser.json(), 
	tasks.addTask
);
router.put(
    '/api/tasks',
    isAuthorized,
    bodyParser.json(),
    tasks.updateTask
);
router.get(
	'/api/tasks',
	isAuthorized,
	tasks.getTasks
);
router.delete(
    '/api/tasks',
    isAuthorized,
    tasks.removeTask
);




router.put(
    '/favorite',
    isAuthorized,
    bodyParser.json(),
    tasks.favorite
);
router.put(
    '/requestHelp',
    isAuthorized,
    bodyParser.json(),
    tasks.requestHelp
);





module.exports = router;
