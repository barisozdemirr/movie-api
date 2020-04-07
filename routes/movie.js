var express = require('express');
var router = express.Router();

//Models Files
const Movie = require("../models/Movie");

router.post('/', (req, res, next) => {
  //const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie(req.body);


  // Promise Yapısı İle Hata Kontrolü
  const promise = movie.save();
  promise.then((data) => {
    res.json({ status : 1 });
  }).catch((err) => {
    res.json(err);
  });    





});

module.exports = router;
