const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log("Database connected : " + mongoURI);
    }
    catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = dbConnect;