const express = require('express')
const router = express.Router()

const Project = require('../models/Project')

//Vistas generales

router.get('/', (req, res, next) => {
  Project.find()
    // .then(projects => res.json({projects}))
    .then(projects => {
      res.render('projects/allProjects', {
        projects
      })
    })
    .catch(err => next(new Error(err)))
})

router.get('/api', (req, res, next) => {
  Project.find()
    .then(projects => res.json({projects}))
    .catch(err => next(new Error(err)))
})

//Axios Vistas generales

function getRestaurants() {
  axios.get("/restaurants/api")
   .then( response => {
     placeRestaurants(response.data.restaurants);
   })
   .catch(error => {
     console.log(error);
   })
 }

//Vista individual

router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(projects => {
      res.render('projects/project', projects)
    })
    .catch(err => next(new Error(err)))
})

// Vista 

router.get('/project/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(projects => {
      res.render('projects/project', projects)
    })
    .catch(err => next(new Error(err)))
})


router.get('/new-project', (req, res, next) => {
  res.render("projects/login")
})

router.post('/new-project', (req, res, next) => {
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
  Project.create({
      name,
      location,
      date,
      colaborationType,
      projectDescription,
      projectTracking,
      totalRaised,
      totalRequired,
      //adminId
    })

    .then(() => res.redirect('/projects'))
    .catch(err => next(new Error(err)))
})





// router.post('/filter', (req, res, next) => {
//   const tipoProyecto = req.body.tipos
//   Project.find(tipoProyecto)
//     .then(theProject => res.render('views-projects/allProject', theProject))
//     .catch(err => res.render('/views/error.hbs'))
// })


router.get("/edit/:id", (req, res) => {
  const id = req.params.id

  Project.findById(id)
    .then(project => res.render('projects/edit-projects', project))
    .catch(err => next(new Error(err)))
});


router.post('/edit', (req, res, next) => {
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
    .then((project) => res.json(project))
    .catch(err => next(new Error(err)))
})


router.get('/delete/:id', (req, res) => {
  const id = req.params.id
  Project.findById(id)
    .then(project => res.render('projects/delete-projects', project))
    .catch(err => next(new Error(err)))
})

router.post('/delete', (req, res, next) => {
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
  Project.findByIdAndDelete(req.body.id, {

    })
    .then(_ => res.redirect('/projects'))
})





module.exports = router