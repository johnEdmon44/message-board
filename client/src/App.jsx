import { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageBoard from './component/MessageBoard';
import { fetchUser } from './component/fetchUser';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () =>
     {
    try {
      await axios.get("http://localhost:3400/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    }
    getUser();
  }, []);  


  return (
    <main className='bg-gray-100 min-h-screen'>
      <nav className='flex justify-center bg-blue-800 font-semibold text-gray-200 gap-10 p-5'>
        <Link to={"/UserList"} >Users</Link>
        {user ? (
          <>
            <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
            <Link to="/UserPage">{user.username}</Link>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to={"/Signup"}>Signup</Link>        
          </>
        )}
      </nav>

      <section className='flex flex-col justify-center items-center'>
        <MessageBoard 
          messagesPerPage={10}
          user={user} 
        />
      </section>
    </main>
  )
}

export default App
