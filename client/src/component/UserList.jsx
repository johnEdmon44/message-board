import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function UserList() {
  const [users, setUsers] = useState([])
  const fetchApi = async () => {
    const response = await axios.get("http://localhost:3400/users");
    setUsers(response.data.usernames);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <section>
      <h1>Users</h1>
      <Link to={"/"}>Home</Link>
      <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
      </ul>
    </section>
  )
}


export default UserList;