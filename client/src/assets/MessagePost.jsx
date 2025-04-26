import { useState, useTransition } from "react";



function MessagePost({ onSubmitMessage, value = ""}) {
  const [message, setMessage] = useState(value);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition( () => {
      onSubmitMessage(message);
      setMessage("");
    });
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

        <button type="submit">{isPending ? "Sending" : "Submit"}</button>
      </form>
    </div>
  )
}

export default MessagePost;