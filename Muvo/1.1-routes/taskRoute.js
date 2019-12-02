// handles requests to task in API, post and get works now

'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const tasks = require('../1.2-controllers/taskController');
const isAuthorized = require('../1.3-middlewares/is-authorized');

router.post(
	'/tasks', 
    isAuthorized,
    bodyParser.json(), 
	tasks.addTask
);
router.put(
    '/tasks',
    isAuthorized,
    bodyParser.json(),
    tasks.updateTask
);
router.get(
	'/tasks',
	isAuthorized,
	tasks.getTasks
);
router.delete(
    '/tasks',
    isAuthorized,
    tasks.removeTask
);
router.put(
    '/locktask',
    isAuthorized,
    tasks.lockTask
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
