import { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUser } from "./fetchUser";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    }
    getUser();
  }, [])


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3400/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Link to={"/UserList"}>Users</Link>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/UserPage">{user.username}</Link>
        </>
      ) : (
        <>
          <Link to="/Login">Login</Link>
          <Link to={"/Signup"}>Signup</Link>        
        </>
      )}   
    </main>
  )
}

export default App
