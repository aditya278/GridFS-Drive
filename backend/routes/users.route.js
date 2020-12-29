var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const { registerController } = require('../controllers/users.controller');

router.post('/register', [
    body("email", "Enter a valid email address").isEmail(),
    body("password").custom((value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(regex.test(value)) {
            return true;
        }
        throw new Error("Enter a valid password i.e. 8 character alphanumeric");
    }),
    body("confirmPassword").custom((value, {req}) => {
        if(value === req.body.password) {
            return true;
        }
        throw new Error("Passwords do not match.");
    }),
    body("name", "Name can't be empty").exists()
], registerController);

module.exports = router;