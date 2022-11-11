import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"
import logo from "../assets/Logo.png"


function Navbar() {
  const { authenticaUser, setIsLoggedIn } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
      //invoke authenticaUser() to change states
    authenticaUser()
  }
  
  //function to invoke styles inside NavLink className
  const assignClassName = (navInfo) => {
    console.log(navInfo.isActive)
    if(navInfo.isActive === true) {
      return "nav-active" //!la creamos en App.cssgit
    } else {
      return "nav-inactive" //!la creamos en App.css
    }
  }

  return (
    <div className='navbar'>
      <div>
      <img src={logo} alt="whatcha cookin logo" width={50} />
      </div>
        
      {setIsLoggedIn === true ? (

        <div>
          <NavLink to="/" className={assignClassName}>
            <button>Home</button>
          </NavLink>
          <NavLink to="/profile" className={assignClassName}>
            <button>Profile</button>
          </NavLink>
          <span className="nav-inactive">
            <button onClick={handleLogout}>Log out</button>
          </span>
      </div> 

      ) : (

        <div>
          <NavLink to="/signup" className={assignClassName} >
            <button>Sign up</button>
          </NavLink>
          <NavLink to="/login" className={assignClassName}>
            <button>Log in</button>
          </NavLink>
          </div>
      )}

    </div>
  )
}

export default Navbar