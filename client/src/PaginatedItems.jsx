import { useState } from "react";
import ReactPaginate from 'react-paginate';


function MessageList({ currentMessages, handleEdit, handleDeleteMessage, user }) {
  return (
    <>
      {currentMessages &&
        currentMessages.map((message) => (
          <div key={message.id}>
            <p>{message.username}</p>
            <p>{message.edited ? "Edited" : ""}</p>
            <p>{message.message}</p>
            <p>{new Date(message.date).toLocaleString()}</p>
            {message.optimistic && <span> (Sending...)</span>}
            {user?.username === message.username && (
              <div>
                <button onClick={() => handleEdit(message.id)}>Edit</button>
                <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ messages, messagesPerPage, handleEdit, handleDeleteMessage, user }) {
  const [messageOffset, setMessageOffset] = useState(0);

  const endOffset = messageOffset + messagesPerPage;
  const currentMessages = messages.slice(messageOffset, endOffset);
  const pageCount = Math.ceil(messages.length / messagesPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * messagesPerPage) % messages.length;
    setMessageOffset(newOffset);
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default PaginatedItems;