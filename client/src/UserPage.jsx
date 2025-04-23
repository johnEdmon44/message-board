import axios from "axios";
import { useEffect, useState } from "react";
import { fetchUser } from "./fetchUser";
import { useNavigate } from "react-router-dom";


function UserPage () {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [updatedUsername, setUdatedUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      console.log(currentUser)
      setUser(currentUser);
    }
    getUser();
  }, [])


  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`http://localhost:3400/delete/${user.id}`, 
        {},
        { withCredentials: true }
      )
      if(response.status === 200) {
        navigate("/");
      }
    } catch(error) {
      console.log(error);
    }
  }


  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3400/updateUsername`, 
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
    <section>
      <h1>Hello, { user ? user.username : "Anon" }</h1>
      <form onSubmit={handleUpdateUsername}>
        <label htmlFor="username">Username: </label>
        <input id="username" name="username" type="text" value={updatedUsername} onChange={(e) => setUdatedUsername(e.target.value)} required></input>
        <button type="submit">Change username</button>
      </form>
      <button onClick={handleDeleteAccount}>Delete</button>
      <button onClick={() => console.log(user)}>Test</button>
    </section>
  )
}


export default UserPage;