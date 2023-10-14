// EditTodo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
 import { useAuthContext } from "../Hooks/useAuthContext";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateText, setUpdateText] = useState('');
  const [updateStatus, setUpdateStatus] = useState('not started');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();


  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`/api/todos/${id}`); // Make a GET request to the new API endpoint
      const todoData = response.data;
      setUpdateText(todoData.text);
      setUpdateStatus(todoData.status);
      setLoading(false);
    } catch (error) {
      setError('Error fetching todo. Please try again later.');
      setLoading(false);
    }
  };


  const updateTodo = async () => {
    try {
      await axios.put(`/api/todos/${id}`, { id, text: updateText, status: updateStatus ,  userId: user.idd  });
      console.log('Todo updated');
      navigate('/users/userhome'); // Redirect to the UserHome page

    } catch (error) {
      console.error('Error updating todo', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Edit Todo</h1>
     <input type="hidden" value={user.idd} />
      <input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
      <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={updateTodo}>Update Todo</button>
    </div>
  );
}

export default EditTodo;
