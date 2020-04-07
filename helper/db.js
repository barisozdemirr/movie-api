const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb+srv://movie_user:test123456@movie-api-wrwj6.mongodb.net/movie-api?retryWrites=true&w=majority",
     { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.connection.on("open", () => {
        console.log("MongoDB Status: Connected!")
    });

    mongoose.connection.on("error", (err) => {
        console.log("MongoDB Status: Error = "+ err);
    });

    mongoose.Promise = global.Promise;
};