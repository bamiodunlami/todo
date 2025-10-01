const passport = require('passport');
const path = require('path');
const User = require(path.join(__dirname, '..', 'users', 'users.model'));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
