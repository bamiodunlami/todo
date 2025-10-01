const express = require('express');
const router = express.Router();
const path = require('path');

const todoController = require(path.join(__dirname, 'todo.controller'));
const { auth } = require(path.join(__dirname, 'todo.middleware'));

router
.get('/', auth, todoController.renderDahsboard)
.get('/sort/:status', auth, todoController.sortTodos)
.post('/add', auth, todoController.addTodo)
.get('/complete/:id', auth, todoController.completeTodo)
.get('/delete/:id', auth, todoController.deleteTodo);

module.exports = router;
