import { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await axios.get("http://localhost:3400/user", { withCredentials: true });
    setUser(response.data.user);
  }
  useEffect(() => {
    fetchUser();
  }, []);

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
      <h1>Hello, { user ?  user.username: "Anon"}</h1>
      <Link to={"/UserList"}>Users</Link>
      <Link to={"/Signup"}>Signup</Link>
      { user ? <button onClick={handleLogout}>logout</button> : 
        <Link to={"/Login"}>Login</Link>}
    </main>
  )
}

export default App
