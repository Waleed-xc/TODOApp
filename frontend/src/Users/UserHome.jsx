// import React, { useState, useEffect } from "react";
// import { useAuthContext } from "../Hooks/useAuthContext";
// import { useUserLogout } from "../Hooks/useUserLogout";
// import axios from 'axios';

// const UserHome = () => {
//   const { user } = useAuthContext();
//   const { userlogout } = useUserLogout();
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);

//   useEffect(() => {
//     // Fetch the user's todos from the backend
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get(`/api/todos?userId=${user.idd}`);
//         setTodos(response.data);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     };

//     fetchTodos();
//   }, [user.idd]);

//   const handleLogout = () => {
//     userlogout();
//     window.location.href = "/";
//   };

//   const handleAddTodo = async () => {
//     try {
//       // Create a new todo on the server
//       const response = await axios.post("/api/todos", {
//         text: newTodo,
//         status: "not started", // Set the initial status
//         userId: user.idd,
//       });

//       setNewTodo(""); // Clear the input field
//       setTodos([...todos, response.data]);
//     } catch (error) {
//       console.error("Error creating todo:", error);
//     }
//   };

//   const handleEditTodo = async (id, text, status) => {
//     try {
//       // Update the todo on the server
//       await axios.put(`/api/todos/${id}`, {
//         text,
//         status,
//         userId: user.idd,
//       });

//       const updatedTodos = todos.map((todo) => {
//         if (todo._id === id) {
//           todo.text = text;
//           todo.status = status;
//         }
//         return todo;
//       });

//       setEditingTodo(null); // Clear the editing state
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     }
//   };

//   const handleDeleteTodo = async (id) => {
//     try {
//       // Delete the todo on the server
//       await axios.delete(`/api/todos/${id}`, {
//         data: { userId: user.idd },
//       });

//       setTodos(todos.filter(todo => todo._id !== id));
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   return (
//     <main role="main">
//       <button className="btn btn-light" onClick={handleLogout}>
//         Log out
//       </button>
//       <div className="bg-light">
//         <div className="container">
//           <h1 className="display-3">Hello, Mr. {user.usernameee}!</h1>
//           <p>Here is Your To Do List</p>
//           <div>
//             <input
//               type="text"
//               placeholder="Add a new todo"
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//             />
//             <button onClick={handleAddTodo}>Add</button>
//           </div>
        
//         </div>
//       </div>
//       <div className="container-fluid bg-light">
//         <div className="row">
//           <div>
//             <h1>Todo List</h1>
//           </div>
//         </div>
//         <ul>
//             {todos.map((todo) => (
//               <li key={todo._id}>
//                 {editingTodo === todo._id ? (
//                   <div>
//                     <input
//                       type="text"
//                       value={todo.text}
//                       onChange={(e) => todo.text = e.target.value}
//                     />
//                     <select
//                       value={todo.status}
//                       onChange={(e) => todo.status = e.target.value}
//                     >
//                       <option value="not started">Not Started</option>
//                       <option value="in progress">In Progress</option>
//                       <option value="completed">Completed</option>
//                     </select>
//                     <button onClick={() => handleEditTodo(todo._id, todo.text, todo.status)}>
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     {todo.text} ({todo.status})
//                     <button onClick={() => setEditingTodo(todo._id)}>Edit</button>
//                     <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>



//         <hr />
//       </div>
//     </main>
//   );
// };

// export default UserHome;


// UserHome.js
// import React, { useState, useEffect } from 'react';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import axios from 'axios';

// function UserHome() {
//   const [createText, setCreateText] = useState('');
//   const [createStatus, setCreateStatus] = useState('not started');
//   const [todos, setTodos] = useState([]);
//   const [updateId, setUpdateId] = useState(null);
//   const [editText, setEditText] = useState('');
//   const [editStatus, setEditStatus] = useState('not started');
//   const { user } = useAuthContext();

//   useEffect(() => {
//     // Fetch Todos when the component mounts
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
//       fetchTodos();
//       setCreateText(''); // Clear the create text input
//     } catch (error) {
//       console.error('Error creating todo', error);
//     }
//   };

 
  
//   const updateTodo = async (id, text, status) => {
//     try {
//       const response = await axios.put(`/api/todos/${id}`, { text, status, userId: user.idd });
//       console.log('Todo updated');
//       fetchTodos(); // Fetch the updated list of todos
//       setUpdateId(null); // Clear the updateId to exit the edit mode
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
//       <h1>Todo App</h1>
//       <input type="text" placeholder="Create Todo" value={createText} onChange={(e) => setCreateText(e.target.value)} />
//       <select value={createStatus} onChange={(e) => setCreateStatus(e.target.value)}>
//         <option value="not started">Not Started</option>
//         <option value="in progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>
//       <button onClick={createTodo}>Create Todo</button>
      
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo._id === updateId ? (
//               <>
//                 <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
//                 <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
//                   <option value="not started">Not Started</option>
//                   <option value="in progress">In Progress</option>
//                   <option value="completed">Completed</option>
//                 </select>
//                 <button onClick={() => updateTodo(todo._id, editText, editStatus)}>Update</button>
//               </>
//             ) : (
//               <>
//                 {todo.text} - {todo.status} (Created at: {new Date(todo.created_at).toLocaleString()})
//                 <button onClick={() => setUpdateId(todo._id)}>Edit</button>
//                 <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>



//     </div>
//   );
// }

// export default UserHome;


// UserHome.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You might need to install axios if not already done
 import { useAuthContext } from "../Hooks/useAuthContext";


function UserHome() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('not started');
  const [todos, setTodos] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const { user } = useAuthContext();


  useEffect(() => {
    // Fetch Todos when the component mounts
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
      const response = await axios.post('/api/todos', { text, status, userId: user.idd });
      console.log('Todo created with ID:', response.data.id);
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo', error);
    }
  };

  const updateTodo = async () => {
    if (!updateId) return;

    try {
      await axios.put(`/api/todos/${updateId}`, { id: updateId, text, status, userId: user.idd });
      console.log('Todo updated');
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, { data: { userId:user.idd } });
      console.log('Todo deleted');
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" placeholder="Todo text" value={text} onChange={(e) => setText(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input type="text" placeholder="User ID" value={user.idd}  />
      <button onClick={createTodo}>Create Todo</button>
      <button onClick={updateTodo}>Update Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} - {todo.status}
            <button onClick={() => setUpdateId(todo._id)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserHome;
