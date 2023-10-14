// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
// import { useUserLogout } from '../Hooks/useUserLogout';

// function UserHome() {
//   const [createText, setCreateText] = useState('');
//   const [createStatus, setCreateStatus] = useState('not started');
//   const [todos, setTodos] = useState([]);
//   const { user } = useAuthContext();
//   const { userlogout } = useUserLogout();
  
// 	const handleClick = () => {
// 	  userlogout()
// 	  window.location.href = "/";
// 	}

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
//       setCreateText('');
//       fetchTodos();
//     } catch (error) {
//       console.error('Error creating todo', error);
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

//               <button class="btn btn-light" onClick={handleClick}>Log out</button>

//       <h1>Todo List</h1>
//       <a href='/users/create'>  k</a>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.text} - {todo.status}
//             <Link to={`/users/edit/${todo._id}`}>Edit</Link> {/* Link to EditTodo component with todo ID */}
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserHome;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import { Link } from 'react-router-dom';
// import { useUserLogout } from '../Hooks/useUserLogout';
// import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component

// function UserHome() {
//   const [createText, setCreateText] = useState('');
//   const [createStatus, setCreateStatus] = useState('not started');
//   const [todos, setTodos] = useState([]);
//   const { user } = useAuthContext();
//   const { userlogout } = useUserLogout();
  
//   const handleClick = () => {
//     userlogout();
//     window.location.href = "/";
//   }

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
//       setCreateText('');
//       fetchTodos();
//     } catch (error) {
//       console.error('Error creating todo', error);
//     }
//   };

//   const deleteTodo = async (id) => {
//     // Ask for confirmation before deleting
//     const confirmed = window.confirm('Are you sure you want to delete this To Do?');
//     if (!confirmed) return;

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
//       <h1>Todo List</h1>
//       <button className="btn btn-light" onClick={handleClick}>Log out</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.text} - {todo.status}
//             <Link to={`/users/edit/${todo._id}`}>Edit</Link>
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
import { Link } from 'react-router-dom';
import { useUserLogout } from '../Hooks/useUserLogout';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component

function UserHome() {
  const [createText, setCreateText] = useState('');
  const [createStatus, setCreateStatus] = useState('not started');
  const [todos, setTodos] = useState([]);
  const { user } = useAuthContext();
  const { userlogout } = useUserLogout();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility
  const [todoToDelete, setTodoToDelete] = useState(null); // Store the ID of the item to delete

  const handleClick = () => {
    userlogout();
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

  const confirmDelete = (id) => {
    setTodoToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setTodoToDelete(null);
  };

  const executeDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todoToDelete}`, { data: { userId: user.idd } });
      console.log('Todo deleted');
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }

    setShowDeleteConfirmation(false);
    setTodoToDelete(null);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button className="btn btn-light" onClick={handleClick}>Log out</button>
             <a href='/users/create'> create</a>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} - {todo.status}
            <Link to={`/users/edit/${todo._id}`}>Edit</Link>
            <button onClick={() => confirmDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        hideModal={cancelDelete}
        confirmModal={executeDelete}
        id={todoToDelete}
        type="todo"
        message="Are you sure you want to delete this To Do?"
      />
    </div>
  );
}

export default UserHome;

