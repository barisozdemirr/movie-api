//Filmler İçin Şemamı Burada Oluşturdum.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title : {
        type : String,
        required: true,
        maxlength: 15,
        minlength: 1
    },
    category : String,
    country : String,
    imdb_score : {
        type : Number,
        maxlength : 10,
        minlength : 0
    },
    year: {
        type : Number,
        maxlength: 2020,
        minlength : 1900
    },
    createdAt : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model("movie",MovieSchema);