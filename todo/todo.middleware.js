const path = require('path');
const passport = require(path.join(__dirname, '..', 'config', 'passport'));

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
};

module.exports = { auth };
