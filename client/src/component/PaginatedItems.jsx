import ReactPaginate from 'react-paginate';
import FormatTime from "../util/formatTime";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList({ currentMessages, handleEdit, handleDeleteMessage, user }) {
  const [dropdown, setDropdown] = useState(null);
  const [messageCount, setMessageCount] = useState([]);

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get("http://localhost:3400/message/countMessage", { withCredentials:  true });
      setMessageCount(response.data.count);
      console.log(response.data.count)
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessageCount();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside ANY open dropdown
      if (!event.target.closest('.dropdown-menu')) {
        setDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <ul className='mt-20 '>
      {currentMessages &&
        currentMessages.map((message) => (
          <li key={message.id} className='flex m-5 bg-white rounded-md shadow-md'>
            <div className='flex flex-col items-center  p-2 w-50 '>
              <h3 className='font-bold text-lg'>{message.username}</h3>
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                <FontAwesomeIcon icon={faUser} size='xl'/>
              </div>
              <small className='flex gap-1 text-gray-500 items-center mt-1 object-center'>
                <FontAwesomeIcon icon={faMessage} color='grey' size='xs' className='mt-0.5'/>
                {messageCount.find(count => count.id === message.user_id)?.count || 0}
              </small>
            </div>
            <div className='w-[600px] p-2'>
              <small className='text-gray-700 font-semi-bold'>Posted <FormatTime date={message.date} /></small>
              <p className='break-words whitespace-pre-wrap mt-2 mb-5'>{message.message}</p>
              <small className='font-bold '>{message.edited ? "Edited" : ""}</small>
            </div>
            {message.optimistic && <span> (Sending...)</span>}
            {user?.username === message.username && (
              <div className='mr-5 relative'>
                <FontAwesomeIcon 
                  icon={faEllipsis} 
                  className='cursor-pointer'                   
                  onClick={() =>
                    setDropdown(dropdown === message.id ? null : message.id)
                  }
                />
                <div>
                  {dropdown === message.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => {
                            handleEdit(message.id);
                            setDropdown(null);
                          }}
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteMessage(message.id);
                            setDropdown(null);
                          }}
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
}

function PaginatedItems({ messages, messagesPerPage, handleEdit, handleDeleteMessage, user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const messageOffset = (currentPage - 1) * messagesPerPage;
  const currentMessages = messages.slice(messageOffset, messageOffset + messagesPerPage);
  const pageCount = Math.ceil(messages.length / messagesPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage })
  };

  return (
    <div>
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
        className='flex justify-center gap-10 font-extrabold text-blue-900 cursor-pointer'
      />
    </div>
  )
}

export default PaginatedItems;