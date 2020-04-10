const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();

//Models
const User = require("../models/User");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password , 10 , (err, hash) => {
    const user = new User({
      username,
      password : hash
  });

  const promise = user.save();
  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});
});

router.post("/authenticate", (req, res) => {

  const { username, password } = req.body;

  User.findOne({
    username
  }, (err, user) => {
    if (err){
      throw err
    }
    if (!user){
        res.json({
        process : false,
        message: "Authentication failed, User is not found."
      })
    }
    else {
        bcrypt.compare(password, user.password).then((result) => {
        if (!result){
          res.json({
            process : false,
            message : "Authentication failed, Wrong password. Please try again."
          });
        } else {
          const payload = {
            username
          }; 
          const token = jwt.sign(payload, req.app.get("api_secret_key") , {
            expiresIn: 720 // 12 Saatlik Token
          });

          res.json({
            process : true,
            token
          });
        }}
      );
    }  
  });
});

module.exports = router;
