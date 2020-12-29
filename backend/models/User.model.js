const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.pre("save", async function () {
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        return {
            error : true,
            msg : "AuthError"
        };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return {
            error : true,
            msg : "AuthError"
        };
    }
    return {
        error : false,
        user
    };
}

const User = mongoose.model("User", userSchema);
module.exports = User;