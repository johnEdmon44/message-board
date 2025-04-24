import { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUser } from "./fetchUser";
import MessagePost from './assets/MessagePost';
import FormatTime from './util/formatTime';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageQ, setMessageQ] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3400/messages", { withCredentials: true });
      setMessages(response.data.messages);
    } catch(error) {
      console.log(error)
    }
  }

  const handlePostMessage = async (text) => {
    const tempId = Date.now();
    const newDate = new Date();
  
    // Wait 1 second before inserting optimistic message
    setTimeout(() => {
      const optimisticMessage = {
        id: tempId,
        username: user.username,
        message: text,
        date: newDate.toISOString(),
        pending: true
      };
      setMessages(prev => [...prev, optimisticMessage]);
      setMessageQ(prev => [...prev, tempId]);
    }, 1000); // ⏱️ delay for realism
  
    try {
      const response = await axios.post("http://localhost:3400/postMessage", { message: text }, { withCredentials: true });
      const savedMessage = response.data.message;
  
      setMessages(prev =>
        prev.map(msg => msg.id === tempId ? savedMessage : msg)
      );
    } catch (error) {
      console.log(error);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      alert("Failed to send message.");
    } finally {
      setMessageQ(prev => prev.filter(id => id !== tempId));
    }
  };
  

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    }
    getUser();
    fetchMessages();
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
      <ul>

      {messages.map((message) => (
        <li key={message.id || `${message.username}-${message.date}`}>
          <p>{message.username}</p>
          <p>{message.message}</p>
          <FormatTime date={message.date}></FormatTime>
        </li>
      ))}  
      </ul>
  
      <MessagePost onSubmitMessage={handlePostMessage} />
      <button onClick={() => console.log(messages)}>Test</button>
    </main>
  )
}

export default App
