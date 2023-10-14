const express = require('express');
const router = express.Router();
const { createTodoo, getTodoos, updateTodoo, deleteTodoo, getTodoById  } = require('../controllers/TodoController');
// Create a new todocp
router.post('/', createTodoo);

// Get all todos
router.get('/', getTodoos);

router.get('/:todoId', getTodoById);

// Update a todo
router.put('/:id', updateTodoo);

// Delete a todo
router.delete('/:id', deleteTodoo);

module.exports = router;