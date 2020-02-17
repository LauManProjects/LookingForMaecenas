const express = require('express');
const router = express.Router();
const User = require("../models/User");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//Passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


//SignUp

router.get("/signup", (req, res, next) => {
  res.render("auths/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auths/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auths/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        console.log("hola")
        res.render("auths/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/auths/index");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

router.get("/login", (req, res, next) => {
  res.render("auths/login");
});



// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser((id, cb) => {
//   User.findById(id, (err, user) => {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// passport.use(new LocalStrategy((username, password, next) => {
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return next(null, false, { message: "Incorrect username" });
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//       return next(null, false, { message: "Incorrect password" });
//     }

//     return next(null, user);
//   });
// }));


module.exports = router;
