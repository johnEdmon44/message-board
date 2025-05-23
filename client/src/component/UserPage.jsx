import axios from "axios";
import { useContext, useState } from "react";
import { fetchUser } from "./fetchUser";
import { AuthContext } from "./auth/AuthContext";


function UserPage () {
  const { user, setUser } = useContext(AuthContext);
  const [updatedUsername, setUdatedUsername] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/delete/${user.id}`, 
        {},
        { withCredentials: true }
      )
      if(response.status === 200) {
        window.location.href = "/";
      }
    } catch(error) {
      console.log(error);
    }
  }


  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/updateUsername`, 
        { username: updatedUsername },
        { withCredentials: true }
      )

      const updatedUser = await fetchUser();
      setUser(updatedUser);
      setUdatedUsername("");
    } catch(error) {
      console.log(error);
    }
  }


  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="font-bold">Hello, { user ? user.username : "Anon" }</h1>
        <form onSubmit={handleUpdateUsername} >
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Change username: </label>
          <input 
          id="username" 
          name="username" 
          type="text" 
          value={updatedUsername} 
          onChange={(e) => setUdatedUsername(e.target.value)} 
          required
          className="mt-1 mb-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">Change username</button>
        </form>
        <button onClick={handleDeleteAccount} className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">Delete</button>
      </div>
    </section>
  )
}


export default UserPage;