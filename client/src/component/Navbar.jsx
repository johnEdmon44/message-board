import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [dropDown, setDropDown] = useState(false);

  const handleDropdown = (e) => {
    e.stopPropagation();
    setDropDown(prev => !prev)
  } 
  
  return (
      <nav className=' font-semibold text-gray-200 relative z-21 bg-blue-800'>
        <div className={`flex `}>
          {/* MENU */}
          <div className="flex w-screen place-items-center h-14 justify-between ">
            <NavLink to={"/"} className={`ml-5`}>Message-board</NavLink>
            <button 
              className={`mr-5 visible lg:hidden`} 
              onClick={handleDropdown}>
              <FontAwesomeIcon icon={dropDown ? faXmark : faBars} size="2xl" style={dropDown ? {color: "#000000"} : {color: "#ffffff"}} />    
            </button>
          </div>


          <div className={``}>
            <div className={`lg:block right-0 lg:absolute  lg:text-gray-200 ${dropDown ? "fixed  text-black block" : "absolute text-gray-200 hidden"} bg-white lg:bg-transparent flex flex-col text-3xl lg:text-base w-screen  h-screen lg:h-20 top-15 lg:top-3 lg:right-3  text-center lg:text-end z-10 lg:z-20`}>
              <NavLink to={"/UserList"} className="border-b-1 lg:border-none w-screen lg:w-0 mr-3" onClick={() => setDropDown(false)}>Users</NavLink>

              {user ? (
                <>
                  <button onClick={handleLogout} className='cursor-pointer lg:border-none  lg:w-0 mr-3'>Logout</button>
                  <NavLink to="/UserPage" className="border-b-1 lg:border-none w-screen lg:w-0 mr-3" onClick={() => setDropDown(false)}>{user.username}</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/Login" className="border-b-1 lg:border-none w-screen lg:w-0 mr-3" onClick={() => setDropDown(false)}>Login</NavLink>
                  <NavLink to={"/Signup"} className="border-b-1 lg:border-none w-screen lg:w-0 mr-3" onClick={() => setDropDown(false)}>Signup</NavLink>
                </>
              )}
            </div>
          </div>  
        </div>
      </nav>
  )
}


export default Navbar;