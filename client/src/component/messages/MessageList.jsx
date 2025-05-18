import { faEllipsis, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormatTime from "../../util/formatTime";
import MessagePost from './MessagePost';


function MessageList({ currentMessages, handleEdit, handleDeleteMessage, user, edit, editId, onSubmitMessage }) {
  const [dropdown, setDropdown] = useState(null);
  const [messageCount, setMessageCount] = useState([]);
  const dropdownRef = useRef();

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
  }, [currentMessages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul className='mt-5'>
      {currentMessages &&
        currentMessages.map((message) => (
          <li key={message.id} className='flex flex-col m-5 bg-white rounded-md shadow-md'>

            {/* USER */}
            <div className='flex  p-2 w-screen lg:w-[600px] border-b-gray-300 shadow-sm relative'>

              <div className='flex flex-col justify-center items-center mr-5'>
                <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                  {/* User icon */}
                  <FontAwesomeIcon icon={faUser} size='xl'/>
                </div>              
                <div>
                  {/* COUNT TOTAL MESSAGES USER SENT */}
                  <div className='flex mt-1 gap-1  items-center'>
                    <FontAwesomeIcon icon={faMessage} color='grey' size='xs' className='mt-0.5'/>
                    <small>
                      {messageCount.find(count => count.id === message.user_id)?.count || 0} 
                    </small>
                  </div>
                </div>
              </div>

                {/* Username */}
              <div>
                <h3 className='font-bold text-lg'>{message.username}</h3>
                <small className=' text-gray-500'>
                  <p className='text-gray-700 font-semi-bold'>Posted <FormatTime date={message.date} /></p>
                </small>
              </div>

              {/* EDIT / DELETE */}
              {user?.username === message.username && (
                <div className='mr-5 absolute right-3 top-3' ref={dropdown === message.id ? dropdownRef : null}>
                  <FontAwesomeIcon 
                    icon={faEllipsis} 
                    className='cursor-pointer'
                    onClick={() =>
                      setDropdown(prev => (prev === message.id ? null : message.id))
                    }                   
                  />
                  <div>
                    {dropdown === message.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg">
                          <button
                            onClick={() => handleEdit(message.id)}
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
            </div>

            {/* MESSAGE */}
            <div className='w-screen lg:w-[600px] p-2'>
              { edit && editId === message.id 
                ?
                <MessagePost value={message.message}     onSubmitMessage={onSubmitMessage} />
                : 
                <>
                  <p className='break-words whitespace-pre-wrap mt-2 mb-5'>{message.message}</p>
                  <small className='font-bold '>{message.edited ? "Edited" : ""}</small>
                </>
              }
            </div>

            {message.optimistic && <span> (Sending...)</span>}
          </li>
        ))}
    </ul>
  );
}


export default MessageList;