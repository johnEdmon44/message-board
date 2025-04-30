import { useState } from "react";
import ReactPaginate from 'react-paginate';
import FormatTime from "./util/formatTime";
import { useSearchParams } from "react-router-dom";

function MessageList({ currentMessages, handleEdit, handleDeleteMessage, user }) {
  return (
    <>
      {currentMessages &&
        currentMessages.map((message) => (
          <div key={message.id}>
            <p>{message.username}</p>
            <p>{message.edited ? "Edited" : ""}</p>
            <p>{message.message}</p>
            <p><FormatTime date={message.date} /></p>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const messageOffset = (currentPage - 1) * messagesPerPage;
  const currentMessages = messages.slice(messageOffset, messageOffset + messagesPerPage);
  const pageCount = Math.ceil(messages.length / messagesPerPage);

  console.log(`message offset ${messageOffset}`)
  console.log(`page count ${pageCount}`)
  console.log(`current messages ${currentMessages}`)
  console.log(`current page ${currentPage}`)
  console.log(`search params ${searchParams}`)
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