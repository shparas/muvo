// Handles routes to signup, signin, signout
// Complete

'use strict';

const express = require('express');

const authController = require('../1.2-controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  authController.signup
);
router.post(
  '/signin',
  authController.signin
);
router.get(
	'/signout', 
	authController.signout
);

module.exports = router;