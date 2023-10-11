import './App.css';
import React from "react";
import { useAuthContext } from "./Hooks/useAuthContext";
import { BrowserRouter as Router, Route, Routes  ,Navigate } from "react-router-dom";
import UserSignup from './Users/UserSignup';
import UserLogin from './Users/UserLogin';
import UserHome from './Users/UserHome';
import TODO from './Users/TODO';
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
	<Router>
				<Routes>
        <Route exact path="/" element={!user? <UserSignup />:<Navigate to="/users/userhome"/> }/>
        <Route exact path="/users/userhome" element={user?<UserHome />:<Navigate to="/"/>}/>
        <Route exact path="/login" element={!user? <UserLogin />:<Navigate to="/users/userhome"/>  }/>
				<Route exact path="/users/todo" element={  <TODO />}/>

				</Routes>
			</Router>
    </div>
  );
}
export default App;
