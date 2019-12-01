// Handles routes to signup, signin, change user settings
// Complete

'use strict';

const express = require('express');

const authController = require('../1.2-controllers/authController');

const router = express.Router();

router.post(
  "/api/signup",
  authController.signup
);
router.post(
  "/api/signin",
  authController.signin
);
router.get(
    "/api/settings",
    authController.getSettings
);
router.post(
    "/api/settings",
    authController.postSettings
);

module.exports = router;