import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3400/login", 
        { username, password },
        { withCredentials: true }
      )

      if(response.status === 200) {
        navigate("/");
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
<section className="flex justify-center items-center min-h-screen bg-gray-100">
  <form 
    onSubmit={handleSubmit} 
    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
  >
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        Username:
      </label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Enter username"
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password:
      </label>
      <input
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter password"
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
    >
      Login
    </button>
  </form>
</section>

  )
}


export default Login;