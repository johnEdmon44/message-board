import axios from "axios";
import { useEffect, useState } from "react";
import { fetchUser } from "./fetchUser";


function UserPage () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser)
    }
    getUser();
  }, [])

  const handleDeleteAccount = () => {
    console.log(user.id)
  }


  return (
    <section>
      <h1>Hello, { user ?  user.username: "Anon"}</h1>
      <button onClick={handleDeleteAccount}>Delete</button>
    </section>
  )
}


export default UserPage;