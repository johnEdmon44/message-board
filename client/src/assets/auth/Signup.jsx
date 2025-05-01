import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Error from "../../Error";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 20) {
      setError("Username must be 20 characters or fewer.");
      return;
    }

    if(password !== confirmPassord) {
      setError("Passwords do not match.");
      return;
    }

    if(password < 8) {
      setError("Password too short");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3400/signup",
        { username, password },
        { withCredentials: true }
      );

      if(response.status === 201) {
        navigate("/Login");
      }
    } catch(error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display "User already exists"
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  const testApi = async () => {
    const response = await axios.get("http://localhost:3400/signup");
    console.log(response);
  }

  useEffect(() => {
    testApi();
  }, [])


  return (
<section className="flex justify-center items-center min-h-screen bg-gray-100">
  <form 
    onSubmit={handleSubmit} 
    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
  >
    <Error message={error} />
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
        placeholder="Max 20 characters"
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={20}
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
        placeholder="Min 8 characters"
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        minLength={8}
      />
    </div>

    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirm password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={confirmPassord}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="Re-enter password"
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
    >
      Signup
    </button>
        <small>Already have an account ? <Link to={"/Login"} className="font-bold">Login</Link></small>
  </form>
</section>

  )
}


export default Signup;