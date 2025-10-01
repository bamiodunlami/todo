const path = require('path');

const passport = require(path.join(__dirname, '..', 'config', 'passport'));

const loginAuth = passport.authenticate('local', {
  successRedirect: '/todo',
  failureRedirect: '/',
  failureFlash: true,
});

const logout = (req, res) => {
  req.logout((err, done) => {
    !err ? res.redirect('/') : console.log(err);
  });
};

module.exports = { loginAuth, logout };
