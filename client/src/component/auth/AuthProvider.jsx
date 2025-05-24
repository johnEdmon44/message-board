import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUser } from "../fetchUser";
import { AuthContext } from "./AuthContext";

function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);

  const handleLogout = async () =>
     {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    }
    getUser();
  }, []);  
  
  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;