import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useOptimistic, useContext } from 'react';
import axios from 'axios';
import MessagePost from './MessagePost';
import MessageList from './MessageList';
import { AuthContext } from './auth/AuthContext';


function MessageBoard() {
  const { user } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [messages, setMessages] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const messagesPerPage = 10;
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
    fetchMessages();
  }, []);


  const handleEdit = async (message_id) => {
    setEditId(message_id);
    setEdit(true);
  }


  const messageOffset = (currentPage - 1) * messagesPerPage;
  const currentMessages = optimisticMessages.slice(messageOffset, messageOffset + messagesPerPage);
  const pageCount = Math.ceil(optimisticMessages.length / messagesPerPage);


  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage })
  };


  const handleDeleteMessage = async (message) => {
    try {
      await axios.delete(`http://localhost:3400/message/deleteMessage/${message}`,{} , { withCredentials: true });
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }


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
      console.log(error);
    }
  };


  return (
    <section className='flex flex-col justify-center items-center'>
      <MessageList
        currentMessages={currentMessages}
        handleEdit={handleEdit}
        handleDeleteMessage={handleDeleteMessage}
        user={user}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex justify-center gap-4 items-center mt-4 cursor-pointe "
        pageLinkClassName=" px-3 py-1 cursor-pointer"
        pageClassName=" rounded hover:bg-blue-100 px-3 py-1"
        activeClassName="bg-blue-500 text-white hover:bg-blue-600  "
        previousClassName="font-bold rounded hover:bg-blue-100 cursor-pointer"
        nextClassName="font-bold rounded hover:bg-blue-100 cursor-pointer"
        disabledClassName="text-gray-400 cursor-not-allowed"
        nextLinkClassName="px-3 py-1"
        previousLinkClassName="px-3 py-1"
      />

      <MessagePost onSubmitMessage={handlePostMessage} />
    </section>
  )
}

export default MessageBoard;