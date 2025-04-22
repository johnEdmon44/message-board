import axios from "axios";
import { useEffect, useState } from "react";
import { fetchUser } from "./fetchUser";
import { useNavigate } from "react-router-dom";


function UserPage () {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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


  return (
    <section>
      <h1>Hello, { user ?  user.username: "Anon"}</h1>
      <button onClick={handleDeleteAccount}>Delete</button>
    </section>
  )
}


export default UserPage;