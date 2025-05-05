import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  
  return (
      <nav className='flex justify-center bg-blue-800 font-semibold text-gray-200 gap-10 p-5'>
        <NavLink to={"/UserList"} >Users</NavLink>
        {user ? (
          <>
            <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
            <NavLink to="/UserPage">{user.username}</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/Login">Login</NavLink>
            <NavLink to={"/Signup"}>Signup</NavLink>        
          </>
        )}
      </nav>
  )
}


export default Navbar;