// // CreateTodo.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
//  import { useAuthContext } from "../Hooks/useAuthContext";

// function CreateTodo() {

//     const [createText, setCreateText] = useState('');
//     const [createStatus, setCreateStatus] = useState('not started');
//     const [message, setMessage] = useState(''); // State for custom message
//     const {user} = useAuthContext();
//     const navigate = useNavigate();

//     const createTodo = async () => {
//         try {
//           const response = await axios.post('/api/todos', { text: createText, status: createStatus, userId: user.idd });
//           console.log('Todo created with ID:', response.data.id);
//           setMessage(response.data.message); // Set the custom message from the response
//           setCreateText('');
//         //   fetchTodos();
//         } catch (error) {
//           console.error('Error creating todo', error);
//           setMessage('Failed to create todo'); // Set an error message

//         }
        
//       };


//   return (
//     <div>
//       <h1>Todo App Create</h1>
//       <input type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
//       <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
//         <option value="not started">Not Started</option>
//         <option value="in progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <button onClick={createTodo}>Create Todo</button>
//       {message && <p>{message}</p>}

//       </div>
//   )
// }
// export default CreateTodo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    <div>
      <h1>Todo App Create</h1>
      <input type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
      <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={createTodo} disabled={redirecting}>Create Todo</button>
      {message && <p>{message}</p>}
      {redirecting && <p>Redirecting in a few seconds...</p>}
    </div>
  );
}

export default CreateTodo;

