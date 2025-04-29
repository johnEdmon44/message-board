import { useEffect, useOptimistic, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUser } from "./fetchUser";
import MessagePost from './assets/MessagePost';
import FormatTime from './util/formatTime';
import PaginatedItems from './PaginatedItems';

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
      const response = await axios.get("http://localhost:3400/messages", { withCredentials: true });
      setMessages(response.data.messages);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    }
    getUser();
    fetchMessages();
  }, []);


  const handlePostMessage = async (newMessage) => {
    addOptimisticMessages(newMessage);
    try {
      if(edit) {
        await axios.post(`http://localhost:3400/editMessage/${editId}`,{ message: newMessage }, { withCredentials: true });
      } else {
        await axios.post("http://localhost:3400/postMessage",{ message: newMessage }, { withCredentials:true });
      }
      fetchMessages();
      setEdit(false);
    } catch(error) {
      console.log(error)
    }
  };


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3400/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteMessage = async (message) => {
    try {
      await axios.delete(`http://localhost:3400/deleteMessage/${message}`,{} , { withCredentials: true });
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


      <PaginatedItems 
        messagesPerPage={15}
        messages={optimisticMessages}
        handleEdit={handleEdit}
        handleDeleteMessage={handleDeleteMessage}
        user={user} 
      />


      <MessagePost onSubmitMessage={handlePostMessage} />
    </main>
  )
}

export default App
