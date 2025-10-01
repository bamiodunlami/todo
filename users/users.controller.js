const path = require('path');
const userModel = require(path.join(__dirname, 'users.model'));

const renderHome = (req, res) => {
  res.render('login');
};

const renderRegister = (req, res) => {
  res.render('register');
};

const registerUser = async (req, res) => {
  const { username, fname, lname, password } = req.body;
  await userModel.register({ username, fname, lname }, password, (err) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/todo');
  });
};



module.exports = {
  renderHome,
  renderRegister,
  registerUser,
};
