var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const { registerController, loginController, getController } = require('../controllers/users.controller');

const auth = require('../middleware/auth.middleware');

router.post('/register', [
    body("email", "Enter a valid email address").isEmail(),
    body("password").custom((value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
        if(regex.test(value)) {
            return true;
        }
        throw new Error("Enter a valid password i.e. 8 character alphanumeric with special characters.");
    }),
    body("confirmPassword").custom((value, {req}) => {
        if(value === req.body.password) {
            return true;
        }
        throw new Error("Passwords do not match.");
    }),
    body("name", "Name can't be empty").exists()
], registerController);

router.post('/login', [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Enter a Password").exists()
], loginController);

router.get('/', auth, getController);

module.exports = router;