// CreateTodo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
 import { useAuthContext } from "../Hooks/useAuthContext";

function CreateTodo() {

    const [createText, setCreateText] = useState('');
    const [createStatus, setCreateStatus] = useState('not started');
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const createTodo = async () => {
        try {
          const response = await axios.post('/api/todos', { text: createText, status: createStatus, userId: user.idd });
          console.log('Todo created with ID:', response.data.id);
          setCreateText('');
        //   fetchTodos();
      navigate('/users/userhome'); // Redirect to the UserHome page
        } catch (error) {
          console.error('Error creating todo', error);
        }
      };


  return (
    <div>
      <h1>Todo App Create</h1>
      <input type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
      <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={createTodo}>Create Todo</button>
      </div>
  )
}
export default CreateTodo;
