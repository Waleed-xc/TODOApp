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
  const [message, setMessage] = useState(''); // State for custom message
  const [redirecting, setRedirecting] = useState(false);

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
     const response =  await axios.put(`/api/todos/${id}`, { id, text: updateText, status: updateStatus ,  userId: user.idd  });
      console.log('Todo updated');
      setMessage(response.data.message); // Set the custom message from the response
      setRedirecting(true); // Display the "Redirecting" message
      setTimeout(() => {
        // Redirect to another page using window.location.href
        window.location.href = '/users/userhome';
      }, 1000); // Redirect after 3 seconds (adjust the delay as needed)
    } catch (error) {
      console.error('Error updating todo', error);
      setMessage('Failed to Edit todo'); // Set an error message

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
      {message && <p>{message}</p>}
      {redirecting && <p>Redirecting in a few seconds...</p>}

    </div>
  );
}

export default EditTodo;
