const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchmea.pre("save", async function () {
    try {
        const user = this;
        if(user.isModified("password")) {
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
    }
    catch(err) {
        throw err;
    }
});

module.exports = mongoose.model("User", userSchmea);