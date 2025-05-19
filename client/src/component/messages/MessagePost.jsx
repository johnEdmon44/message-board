import { useState, useTransition, useEffect } from "react";
import Error from "../Error";



function MessagePost({ onSubmitMessage, value = "", error, ref, onCancelEdit, edit}) {
  const [message, setMessage] = useState(value);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMessage(value);
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition( () => {
      onSubmitMessage(message);
      setMessage("");
    });
  }

  return (
    <div ref={ref} className="bg-white w-screen lg:w-[600px] rounded-sm mt-5 mb-5 shadow-md">
      <form onSubmit={handleSubmit} className="flex items-center p-5 gap-10">
        <div className="flex flex-col">
          <Error message={error}></Error>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message (255)..."
            rows="4"
            cols="50"
            required
            maxLength={255}
            minLength={3}
            className="w-full bg-white border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-5">
          <button type="submit" className="bg-blue-950 text-white rounded-sm font-semibold p-2 cursor-pointer">{isPending ? "Sending" : "Submit"}</button>
          {edit 
            ? 
            <button onClick={onCancelEdit} className="bg-blue-100 text-blue-950 rounded-sm font-semibold p-2 cursor-pointer">Cancel</button>
            :
            ""}
        </div>
      </form>
    </div>
  )
}

export default MessagePost;