const Todoo = require('../models/TodoModel');
 

const createTodoo = async (req, res) => {
    try {
      const { text, completed, inProgress, userId } = req.body;
      const todoo = new Todoo({
        text: text,
        completed: completed,
        inProgress: inProgress,
        user: userId, // Assuming 'user' is the field for storing the user ID
      });
      const savedTodoo = await todoo.save();
      res.status(201).json({ id: savedTodoo._id }); // Return the ID in the response
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  };
  
// const createTodoo = async (req, res) => {
//     try {
//       const { text, completed, inProgress, userId } = req.body;
//       const todoo = new Todoo({
//         text: text,
//         completed: completed,
//         inProgress: inProgress,
//         user: userId, // Assuming 'user' is the field for storing the user ID
//       });
//       const savedTodoo = await todoo.save();
//       res.status(201).json(savedTodoo);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create todo' });
//     }
//   };
  

// Get all todoos for the current user
// Get all Todoos for the current user
const getTodoos = async (req, res) => {
    try {
      const { userId } = req.body; // Get the user's ID from the request body
  
      const todoos = await Todoo.find({ user: userId });
      res.status(200).json(todoos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Update a todoo item
// Update a Todoo item
const updateTodoo = async (req, res) => {
    try {
      const { id, text, completed, inProgress, userId } = req.body; // Include userId in the request body
  
      const updatedTodoo = await Todoo.findByIdAndUpdate(
        id,
        { text, completed, inProgress },
        { new: true }
      );
  
      if (!updatedTodoo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      if (updatedTodoo.user.toString() !== userId) {
        return res.status(403).json({ error: 'Permission denied' });
      }
  
      res.status(200).json(updatedTodoo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Delete a todoo item
// Delete a Todoo item
const deleteTodoo = async (req, res) => {
    try {
      const { userId } = req.body; // Include userId in the request body
      const { id } = req.params; // Get the id from the URL parameter
  
      const deletedTodoo = await Todoo.findByIdAndDelete(id);
  
      if (!deletedTodoo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      // Check if the deleted todo belongs to the specified user
      if (deletedTodoo.user.toString() !== userId) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
  
      res.status(204).end();
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
};
