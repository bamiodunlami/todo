const path = require('path');

const passport = require(path.join(__dirname, '..', 'config', 'passport'));


const loginAuth =  passport.authenticate('local', {
  successRedirect: '/todo',
  failureRedirect: '/',
  failureFlash: true
});

module.exports = {loginAuth};