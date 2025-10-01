const express = require('express');
const router = express.Router();

const path = require('path');
const userController = require(path.join(__dirname, 'users.controller'));
const userAuth = require(path.join(__dirname, 'user.auth'));

router
  .get('/', userController.renderHome)
  .post('/login', userAuth.loginAuth)

  .get('/register', userController.renderRegister)
  .post('/register', userController.registerUser)
  .get('/logout', userAuth.logout);

module.exports = router;
