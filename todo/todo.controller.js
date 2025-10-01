const path = require('path');
const todoDb = require(path.join(__dirname, 'todo.model'));

// Render dashboard with user's todos
const renderDahsboard = async (req, res) => {
  try {
    const todos = await todoDb.where({ userId: req.user.id }).lean();
    res.render('todo', { user: req.user, todos});
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
};

//sort todos by status
const sortTodos = async (req, res) => {
  try {
    const { status } = req.params; // Get the status from query parameters
    let todos;
    if (status) {
      todos = await todoDb.find({ userId: req.user.id }).sort({ status: status === 'completed' ? -1 : 1 });
    } else {
      todos = await todoDb.find({ userId: req.user.id }).lean();
    }
    res.render('todo', { user: req.user, todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Add a new todo
const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new todoDb({
      title,
      description,
      userId: req.user.id,
    });

    await newTodo.save();
    req.flash('success', 'Todo added successfully');
    res.redirect('/todo');
  } catch (error) {
    console.error('Error adding todo:', error);
    req.flash('error', 'Failed to add todo');
    res.redirect('/todo');
  }
};

// Mark a todo as completed
const completeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoDb.updateOne({userId: req.user.id, todo_id:id }, { status: 'completed' });
    req.flash('success', 'Todo marked as completed');
    res.redirect('/todo');
  } catch (error) {
    console.error('Error completing todo:', error);
    req.flash('error', 'Failed to complete todo');
    res.redirect('/todo');
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoDb.deleteOne({ todo_id: id, userId: req.user.id });
    req.flash('success', 'Todo deleted successfully');
    res.redirect('/todo');
  } catch (error) {
    console.error('Error deleting todo:', error);
    req.flash('error', 'Failed to delete todo');
    res.redirect('/todo');
  }
};

module.exports = { renderDahsboard, sortTodos, addTodo, completeTodo, deleteTodo };