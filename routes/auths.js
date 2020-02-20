const express = require('express');
const router = express.Router();
const User = require("../models/User")
const Project = require('../models/Project');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//Passport
const passport = require("passport");

// ensureLogin
const ensureLogin = require("connect-ensure-login");

//SignUp

//SignUp Administrador
//Sin referencia a :id y redireccionar a create project.

router.get("/signupAdmin", (req, res, next) => {
  res.render("auths/signupAdmin");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.nombre;
  const lastName = req.body.apellidos;
  const email = req.body.email;
  const phone = req.body.telefono;
  const password = req.body.password;
  const location = req.body.location;
  const type = "Admin";
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
    console.log(project_id)
    console.log(newUser)
   

    newUser.save((err) => {
      if (err) {
        res.render("auths/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/auths/login"); //Redireccionar a crear
      }
    });
  })
  .catch(error => {
    next(error)
  })
});


//SignUp Colaboradores
//Añadir de la view el Id

router.get("/signup/:id", (req, res, next) => {
  Project.findById(req.params.id)
  // .then(project => res.json(project))
  .then(project => res.render("auths/signup", project));
});

router.post("/signup/:id", (req, res, next) => {

  const name = req.body.nombre;
  const lastName = req.body.apellidos;
  const email = req.body.email;
  const phone = req.body.telefono;
  const password = req.body.password;
  const location = req.body.location;
  const type = req.body.type;
  const personalDescription = req.body.personalDescription;
  const economicContribution = req.body.economicContribution;
  const project_id = req.body.project_id

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
        res.redirect("/auths/login");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

// Log In

router.get("/login", (req, res, next) => {
  res.render("auths/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auths/private-page",
  failureRedirect: "/auths/login",
  failureFlash: true,
  passReqToCallback: true
}));



// Role CheckIn

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.type === role) {
      return next();
      console.log('Hecho')
    } else {
      res.redirect('/auths/login')
    }
  }
}



const checkAdmin  = checkRoles('Admin');
const checkEconomic = checkRoles('Economic Maecenas');
const checkTech = checkRoles('Technical Maecenas');
const checkTourist = checkRoles('Tourist Maecenas');


// Redireccionador de Rutas

router.get("/private-page", (req, res) => {
  if (req.user.type === "Admin") {
    res.redirect("/auths/private-admin")
  } else if (req.user.type !== "Admin") {
    res.redirect("/auths/private-colaborator")
  } else {
    res.redirect("/auths/login")
  }
});

// Homes por rutas


//Admin

router.get("/private-admin", checkAdmin, (req,res) => {
  res.render("auths/private-Admin", req.user)
  console.log(req.user)
})

router.get("/private-admin-New", checkAdmin, (req,res) => {
    res.render("auths/newProject", req.user)  
})

router.get("/private-admin-Projects", checkAdmin, (req,res) => {
  Project.find({adminId: req.user._id})
  .then((project) => {
    // res.json(project)
    res.render("auths/projects", {project})
  })
})

router.get("/private-admin-Edit", checkAdmin, (req,res) => {
  Project.find({adminId: req.user._id})
  .then((project) => {
    // res.json({project})
    res.render("auths/projects-edit", {project})
  })
})

router.post('/private-admin-edit', (req, res, next) => {
  const {
    name,
    location,
    date,
    colaborationType,
    projectDescription,
    projectTracking,
    totalRaised,
    totalRequired,
    //adminId
  } = req.body
  console.log(name)
  Project.findByIdAndUpdate(req.body.id, {
      name: name,
      location: location,
      date: date,
      type: colaborationType,
      projectDescription: projectDescription,
      projectTracking: projectTracking,
      totalRaised: totalRaised,
      totalRequired: totalRequired
    })
//     .then((project) => res.json(project))
//     .catch(err => next(new Error(err)))
})
// .then(res.redirect("/auths/projects"))

router.post("/private-admin-Projects", checkAdmin, (req,res) => {
  Project.find({adminId: req.user._id})
  .then((project) => {
    // res.json(project)
    res.render("auths/projects", {project})
  })
})

router.post('/new-project',  checkAdmin, (req, res, next) => {
  console.log(JSON.stringify(req.body))
  console.log("💩".repeat(100))

  const {
    name,
    lat,
    lon,
    date,
    colaborationType,
    projectDescription,
    projectTracking,
    totalRaised,
    totalRequired,
    adminId
  } = req.body
console.log(lat)
  let xxx = {
    name,
    location: {
      type: "Point",
      coordinates: [lat, lon]
    },
    date,
    colaborationType,
    projectDescription,
    projectTracking,
    totalRaised,
    totalRequired,
    adminId
  }

  console.log(xxx)

  Project.create(xxx)

    // .then(() => res.redirect('/auths/private-Admin'))
   .then(() => res.json(xxx))
    .catch(err => next(new Error(err)))
})

//Colaborador

router.get("/private-colaborator", checkEconomic || checkTech || checkTourist, (req,res) => {
  res.render("auths/private-Colaborator", req.user)
})

router.get("/private-colaborator-Projects", checkEconomic || checkTech || checkTourist, (req,res) => {
  Project.findById(req.user.project_id)
  .then((project) => {
    // res.json(project)
    res.render("auths/projects-colaborator", project)
  })
})

// Log Out

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auths/login");
});


module.exports = router;
