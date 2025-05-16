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
    <div className="bg-white w-screen lg:w-[600px] rounded-sm mt-5 mb-5 shadow-md">
      <form onSubmit={handleSubmit} className="flex items-center p-5 gap-10">
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          rows="4"
          cols="50"
          required
          className="w-full bg-white border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button type="submit" className="bg-blue-950 text-white rounded-sm font-semibold p-2">{isPending ? "Sending" : "Submit"}</button>
      </form>
    </div>
  )
}

export default MessagePost;