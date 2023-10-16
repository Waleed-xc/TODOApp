import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useUserLogout } from '../Hooks/useUserLogout';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component
import '../Users/style.css';
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
    <body className='bg-light bg-gradient' style={{height: "100vh"}} >
      

    <div className='contrainer bg-light' >

<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent: 'center' , alignItems: 'center' }} >
{user && (
            <div>
        	 <span >Logged User &nbsp;   {user.email}</span> 
           &nbsp;
              <button class="btn btn-dark" onClick={handleClick}>Log out</button>
            </div>
          )}
          &nbsp; &nbsp;



          </nav>
 
      <div class="bg-light"  >
    <div class="container">
      <h1 class="display-3">Hello, Mr. {user.usernameee}!</h1>
      <h3 class="display-5" >Here Are Your To Do List</h3>
    </div>
</div>
<Link to="/users/create"  className="btn btn-primary" >
							Create To Do
						</Link>

            <br />
            <br />



          <div className=" table-responsive">
          <table className="  table  table-dark table-hover table-striped container ">

          <thead>
    <tr>
      <th>ToDo</th>
      <th>Status</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>



  <tbody>
        {todos.map((todo) => (
          <tr key={todo._id}>
             <td>{todo.text}</td>
             <td>{todo.status}</td>
             <td> <Link to={`/users/edit/${todo._id}`} className="btn btn-warning" >Edit</Link></td>
             <td> <button className="btn btn-danger" onClick={() => confirmDelete(todo._id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        hideModal={cancelDelete}
        confirmModal={executeDelete}
        id={todoToDelete}
        type="todo"
        message="Are you sure you want to delete this To Do?"
      />

</table>

</div>

</div>


<br />

</body>



  );
}

export default UserHome;

