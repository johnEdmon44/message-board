import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3400/signup",
        { username, password },
        { withCredentials: true }
      );

      if(response.status === 201) {
        navigate("/");
      }
    } catch(error) {
      console.log(error)
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
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Max 20 characters"></input>
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"></input>
        </div>

        <button type="submit">Signup</button>
      </form>
    </section>
  )
}


export default Signup;