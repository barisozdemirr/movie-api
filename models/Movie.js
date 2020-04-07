//Filmler İçin Şemamı Burada Oluşturdum.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title : {
        type : String,
        required: true
    },
    category : String,
    country : String,
    imdb_score : Number,
    year: Number,
    date : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model("movie",MovieSchema);