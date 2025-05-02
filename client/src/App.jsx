import { useEffect, useOptimistic, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUser } from './component/fetchUser';
import MessagePost from './component/MessagePost';
import PaginatedItems from './component/PaginatedItems';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
    messages,
    (currentMessages, newMessage) => [
      ...currentMessages,
      {
        id: Date.now(),  
        username: user.username,
        message: newMessage,
        date: new Date().toISOString(),
        optimistic: true
      } 
    ] 
  );

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3400/message/messages", { withCredentials: true });
      setMessages(response.data.messages);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
      console.log(currentUser)
    }
    getUser();
    fetchMessages();
  }, []);


  const handlePostMessage = async (newMessage) => {
    addOptimisticMessages(newMessage);
    try {
      if(edit) {
        await axios.post(`http://localhost:3400/message/editMessage/${editId}`,{ message: newMessage }, { withCredentials: true });
      } else {
        await axios.post("http://localhost:3400/message/postMessage",{ message: newMessage }, { withCredentials:true });
      }
      fetchMessages();
      setEdit(false);
    } catch(error) {
      console.log(error)
    }
  };


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3400/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteMessage = async (message) => {
    try {
      await axios.delete(`http://localhost:3400/message/deleteMessage/${message}`,{} , { withCredentials: true });
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (message_id) => {
    setEditId(message_id);
    setEdit(true);
  }

  return (
    <main className='bg-gray-100 min-h-screen'>

      <button onClick={() => console.log(user)}>TEST</button>
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
        <PaginatedItems 
          messagesPerPage={5}
          messages={optimisticMessages}
          handleEdit={handleEdit}
          handleDeleteMessage={handleDeleteMessage}
          user={user} 
        />

        <MessagePost onSubmitMessage={handlePostMessage} />
      </section>
    </main>
  )
}

export default App
