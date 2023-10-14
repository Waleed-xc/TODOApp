const Todoo = require('../models/TodoModel');
// Create a Todoo item
const createTodoo = async (req, res) => {
  try {
    const { text, status, userId } = req.body; // Use 'status' instead of 'completed' and 'inProgress'
    const todoo = new Todoo({
      text,
      status, // Use 'status' field
      user: userId,
    });
    const savedTodoo = await todoo.save();
    res.status(201).json({ id: savedTodoo._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};


// Delete a Todoo item
const deleteTodoo = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const deletedTodoo = await Todoo.findByIdAndDelete(id);

    if (!deletedTodoo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (deletedTodoo.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get Todoo items for a specific user
const getTodoos = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const todoos = await Todoo.find({ user: userId });
    res.status(200).json(todoos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single todo by ID
const getTodoById = async (req, res) => {
  try {
    const { todoId } = req.params; // Assuming the todoId is part of the URL params
    
    if (!todoId) {
      return res.status(400).json({ error: 'Todo ID is required' });
    }

    const todo = await Todoo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateTodoo = async (req, res) => {
  try {
    const { id, text, status, userId } = req.body; // Include 'status' and 'userId' fields

    const todo = await Todoo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (todo.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const updatedTodoo = await Todoo.findByIdAndUpdate(
      id,
      { text, status }, // Use 'status' field
      { new: true }
    );

    res.status(200).json(updatedTodoo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createTodoo,
  getTodoos,
  updateTodoo,
  deleteTodoo,
  getTodoById,
};