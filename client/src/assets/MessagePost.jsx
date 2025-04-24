import { useState } from "react";



function MessagePost({ onSubmitMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     await onSubmitMessage(message);
    setMessage("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          rows="4"
          cols="50"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MessagePost;