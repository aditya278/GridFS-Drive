const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchmea = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    signUpDate : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User", userSchmea);