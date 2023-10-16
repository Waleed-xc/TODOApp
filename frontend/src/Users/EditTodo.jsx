import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../Hooks/useAuthContext";
import { PenIcon , TrashIcon, AddIcon } from '../Users/Icons'; // Import the PenIcon from your Icon component

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
    return  <div className='d-flex justify-content-center'> <div className="  w-25 text-dark bg-primary " >Loading...</div>  </div>;
  }

  if (error) {
    return   <div className='d-flex justify-content-center'> <div className="  w-25 text-dark bg-warning" >{error}</div>  </div>;
  }

  return (
    <div className='bg-light bg-gradient' style={{height: "100vh"}}>


<div class="bg-light"  >
      <h1 class="display-3">Edit Todo</h1>
    </div>




     <input type="hidden" value={user.idd} />
<div className='d-flex justify-content-center' >
    <input class="  w-25 form-control" id="ex2" type="text"  value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
    </div>

    <div className='d-flex justify-content-center' >
      <select class="w-25 form-select" aria-label="Default select example" value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      </div>


      <button className='btn btn-warning' onClick={updateTodo}> <PenIcon/> Edit Todo</button>
      <div className='d-flex justify-content-center'  > {message && <div  style={{textAlign: 'center'}}  className="w-25 text-dark bg-success">{message}</div>} </div>
         <div className='d-flex justify-content-center'  >  {redirecting && <p  style={{textAlign: 'center'}} className="w-25 text-dark bg-success">Redirecting in a few seconds...</p>}
      </div>


    </div>
  );
}

export default EditTodo;
