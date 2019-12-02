// Handles routes to signup, signin, change user settings
// Complete

'use strict';
const multer = require("multer");
const path = require("path");
const express = require('express');

const authController = require('../1.2-controllers/authController');

const router = express.Router();


router.post(
    "/signup",
    authController.signup
);
router.post(
    "/signin",
    authController.signin
);
router.get(
    '/signout',
    authController.signout
);

router.post(
    "/settings",
    authController.postSettings
);
router.post(
    "/profilePic",
    multer({
        dest: path.join(__dirname, '..', 'public', 'images'),
        rename: function (fieldname) {
            return fieldname + '-' + Date.now();
        }
    }).single("profileImage"), authController.postImage);



module.exports = router;