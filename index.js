require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const expressSession = require('express-session');
const flash = require('express-flash');

const port = process.env.PORT || 3000;

//configs
const db = require(path.join(__dirname, 'config', 'db'));
const passport = require(path.join(__dirname, 'config', 'passport'));

// routers
const userRouter = require(path.join(__dirname, 'users', 'users.router'));
const todoRouter = require(path.join(__dirname, 'todo', 'todo.router'));

// middlewares
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); //set view engine to ejs

app.use('/', userRouter);
app.use('/todo', todoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!'); 
  next();
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
