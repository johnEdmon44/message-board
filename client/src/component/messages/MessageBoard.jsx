import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MessagePost from './MessagePost';
import MessageList from './MessageList';
import { AuthContext } from '../auth/AuthContext';


function MessageBoard() {
  const { user } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [error , setError] = useState("");

  const messagesPerPage = 15;
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3400/message/messages", {
        params: {
          page: currentPage,
          limit: messagesPerPage
        }
      }, { withCredentials: true });
      setMessages(response.data.messages);
      setPageCount(response.data.totalPages);
    } catch(error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchMessages();
  }, [currentPage]);


  const handleEdit = async (message_id) => {
    setEditId(message_id);
    setEdit(true);
  }


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
    setError("");
    try {
      if(edit) {
        await axios.post(`http://localhost:3400/message/editMessage/${editId}`,{ message: newMessage }, { withCredentials: true });
      } else {
        await axios.post("http://localhost:3400/message/postMessage",{ message: newMessage }, { withCredentials:true });
      }
      fetchMessages();
      setEdit(false);
    } catch(error) {
      setError(error.response.data.error);
    }
  };


  return (
    <section className='flex flex-col justify-center items-center'>
      <MessageList
        currentMessages={messages}
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

      <MessagePost onSubmitMessage={handlePostMessage} error={error} />
    </section>
  )
}

export default MessageBoard;