// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";

// function UserHome() {
//   const [createText, setCreateText] = useState(''); // State for creating todos
//   const [updateText, setUpdateText] = useState(''); // State for updating todos
//   const [createStatus, setCreateStatus] = useState('not started'); // State for creating status
//   const [updateStatus, setUpdateStatus] = useState('not started'); // State for updating status
//   const [todos, setTodos] = useState([]);
//   const { user } = useAuthContext();
//   const [updateId, setUpdateId] = useState(null);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     if (!user.idd) return;
//     try {
//       const response = await axios.get(`/api/todos?userId=${user.idd}`);
//       setTodos(response.data);
//     } catch (error) {
//       console.error('Error fetching todos', error);
//     }
//   };

//   const createTodo = async () => {
//     try {
//       const response = await axios.post('/api/todos', { text: createText, status: createStatus, userId: user.idd });
//       console.log('Todo created with ID:', response.data.id);
//       setCreateText(''); // Clear the createText field
//       fetchTodos();
//     } catch (error) {
//       console.error('Error creating todo', error);
//     }
//   };

//   const updateTodo = async () => {
//     if (!updateId) return;

//     try {
//       await axios.put(`/api/todos/${updateId}`, { id: updateId, text: updateText, status: updateStatus, userId: user.idd });
//       console.log('Todo updated');
//       fetchTodos();
//       setUpdateId(null); // Clear the updateId to hide the update fields
//       setUpdateText(''); // Clear the updateText field
//     } catch (error) {
//       console.error('Error updating todo', error);
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await axios.delete(`/api/todos/${id}`, { data: { userId: user.idd } });
//       console.log('Todo deleted');
//       fetchTodos();
//     } catch (error) {
//       console.error('Error deleting todo', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Todo App Create</h1>
//       <input type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
//       <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
//         <option value="not started">Not Started</option>
//         <option value="in progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <input type="hidden" value={user.idd} />
//       <button onClick={createTodo}>Create Todo</button>

//       <h1>Todo App Update</h1>
//       {updateId && (
//         <div>
//           <input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
//           <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
//             <option value="not started">Not Started</option>
//             <option value="in progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//           <button onClick={updateTodo}>Update Todo</button>
//         </div>
//       )}
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.text} - {todo.status}
//             <button onClick={() => setUpdateId(todo._id)}>Edit</button>
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserHome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useUserLogout } from '../Hooks/useUserLogout';

function UserHome() {
  const [createText, setCreateText] = useState('');
  const [createStatus, setCreateStatus] = useState('not started');
  const [todos, setTodos] = useState([]);
  const { user } = useAuthContext();
  const { userlogout } = useUserLogout();
  
	const handleClick = () => {
	  userlogout()
	  window.location.href = "/";
	}

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    if (!user.idd) return;
    try {
      const response = await axios.get(`/api/todos?userId=${user.idd}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const createTodo = async () => {
    try {
      const response = await axios.post('/api/todos', { text: createText, status: createStatus, userId: user.idd });
      console.log('Todo created with ID:', response.data.id);
      setCreateText('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, { data: { userId: user.idd } });
      console.log('Todo deleted');
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div>
      {/* <h1>Todo App Create</h1>
      <input type="text" placeholder="Todo text" value={createText} onChange={(e) => setCreateText(e.target.value)} />
      <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={createTodo}>Create Todo</button> */}
              <button class="btn btn-light" onClick={handleClick}>Log out</button>

      <h1>Todo List</h1>
      <a href='/users/create'>  k</a>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} - {todo.status}
            <Link to={`/users/edit/${todo._id}`}>Edit</Link> {/* Link to EditTodo component with todo ID */}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserHome;
