const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy(
  {
    passReqToCallback: true
  },
  (req, username, password, done) => {
    // console.log("done 1")
    // console.log(req.body)
    // console.log(password)
    // console.log(done)

    let query = { email: req.body.username }
    
    console.log(query)
    
    User.findOne(query)
    .then(foundUser => {
      if (!foundUser) {
        console.log("done 2")
        done(null, false, { message: 'Incorrect email' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        console.log("done 3")
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      
      console.log("done 4")
      done(null, foundUser);
      
    })
    .catch(err => {
      console.log(err)
    });
  }
));
