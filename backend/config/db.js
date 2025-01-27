const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Successfully connected to the database');
        })
        .catch((err) => {
            console.error('Error connecting to the database', err);
            process.exit(1); // Exit the process with failure
        });
};

module.exports = connectDB;
