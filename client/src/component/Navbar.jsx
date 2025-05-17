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
      <nav className={`font-semibold lg:static text-gray-200 z-21 bg-blue-800 ${dropDown ? 'fixed' : 'relative'}`}>
        <div className={`flex justify-between`}>
          {/* MENU */}
          <div className="flex w-screen place-items-center h-14 justify-between lg:justify-start">
            <NavLink to={"/"} className={`ml-5 z-100 cursor-pointer`}>Message-board</NavLink>
            <button 
              className={`mr-5 visible lg:hidden`} 
              onClick={handleDropdown}>
              <FontAwesomeIcon icon={dropDown ? faXmark : faBars} size="2xl" style={dropDown ? {color: "#000000"} : {color: "#ffffff"}} />    
            </button>
          </div>


          <div className={``}>
            <div className={`lg:block right-0  lg:text-gray-200 
              ${dropDown ? "fixed  text-black block" : "absolute text-gray-200 hidden"}
               bg-white lg:bg-transparent flex flex-col text-3xl lg:text-base w-screen  h-screen lg:h-20 top-15 lg:top-3 lg:right-3  
               text-center z-10 lg:z-20`}>
              <div className='flex flex-col lg:flex-row  lg:absolute right-5 lg:gap-5'>
                <NavLink to={"/UserList"}  onClick={() => setDropDown(false)}>Users</NavLink>
                {user ? (
                  <div className="flex flex-col lg:flex-row lg:gap-5">
                    <button onClick={handleLogout} >Logout</button>
                    <NavLink to="/UserPage" onClick={() => setDropDown(false)}>{user.username}</NavLink>
                  </div>
                ) : (
                  <>
                    <NavLink to="/Login"  onClick={() => setDropDown(false)}>Login</NavLink>
                    <NavLink to={"/Signup"}  onClick={() => setDropDown(false)}>Signup</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>  
        </div>
      </nav>
  )
}


export default Navbar;