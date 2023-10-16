import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PenIcon , TrashIcon, AddIcon } from '../Users/Icons'; // Import the PenIcon from your Icon component
import { useAuthContext } from "../Hooks/useAuthContext";
function CreateTodo() {
  const [createText, setCreateText] = useState('');
  const [createStatus, setCreateStatus] = useState('not started');
  const [message, setMessage] = useState(''); // State for custom message
  const { user } = useAuthContext();
  const [redirecting, setRedirecting] = useState(false);


  const createTodo = async () => {
    try {
      const response = await axios.post('/api/todos', { text: createText, status: createStatus, userId: user.idd });
      console.log('Todo created with ID:', response.data.id);
      setMessage(response.data.message); // Set the custom message from the response
      setCreateText('');

      setRedirecting(true); // Display the "Redirecting" message

      setTimeout(() => {
        // Redirect to another page using window.location.href
        window.location.href = '/users/userhome';
      }, 1000); // Redirect after 3 seconds (adjust the delay as needed)
    } catch (error) {
      console.error('Error creating todo', error);
      setMessage('Failed to create todo'); // Set an error message
    }
  };

  return (
    <div className='bg-light bg-gradient' style={{height: "100vh"}}>


    <div class="bg-light"  >
          <h1 class="display-3">Create Todo</h1>
        </div>

      <div className='d-flex justify-content-center' >

      <input class="  w-25 form-control" type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
</div>
      <div className='d-flex justify-content-center' >
      <select  class="w-25 form-select" aria-label="Default select example" value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
<br/>
 <button className='btn btn-primary' onClick={createTodo} disabled={redirecting}>  <AddIcon /> Add Todo  </button>



      <div className='d-flex justify-content-center'  > {message && <div  style={{textAlign: 'center'}}  className="w-25 text-dark bg-success">{message}</div>} </div>
         <div className='d-flex justify-content-center'  >  {redirecting && <p  style={{textAlign: 'center'}} className="w-25 text-dark bg-success">Redirecting in a few seconds...</p>}
      </div>


    </div>
  );
}

export default CreateTodo;

