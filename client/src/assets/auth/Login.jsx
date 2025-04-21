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
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter username"></input>
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password"></input>
        </div>

        <button type="submit">Login</button>
      </form>
    </section>
  )
}


export default Login;