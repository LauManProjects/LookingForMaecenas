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

// ensureLogin
const ensureLogin = require("connect-ensure-login");





//SignUp

router.get("/signup", (req, res, next) => {
  res.render("auths/signup");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.nombre;
  const lastName = req.body.apellidos;
  const email = req.body.email;
  const phone = req.body.telefono;
  const password = req.body.password;
  const location = req.body.location;
  const type = req.body.type;
  const personalDescription = req.body.personalDescription;
  const economicContribution = req.body.economicContribution;
  const project_id = req.body.project_id;

  if (email === "" || password === "") {
    res.render("auths/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ email })
  .then(user => {
    if (user !== null) {
      res.render("auths/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      lastName: lastName,
      password: hashPass,
      email: email,
      phone: phone,
      location: location,
      type: type,
      personalDescription: personalDescription,
      economicContribution: economicContribution,
      project_id: project_id
    });
    console.log(newUser)
   

    newUser.save((err) => {
      if (err) {
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


// Log In

router.get("/login", (req, res, next) => {
  res.render("auths/login");
});



passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

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


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auths/private-page",
  failureRedirect: "/auths/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auths/private-page", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auths/login");
});

module.exports = router;
