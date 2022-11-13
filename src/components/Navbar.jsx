import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"
import logo from "../assets/Logo.png"


function Navbar() {
  const { authenticaUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
      //invoke authenticaUser() to change states
    authenticaUser()
  }
  
  //function to invoke styles inside NavLink className
  const assignClassName = (navInfo) => {
    console.log(navInfo.isActive)
    if(navInfo.isActive === true) {
      return "nav-active" //!la creamos en App.css
    } else {
      return "nav-inactive" //!la creamos en App.css
    }
  }

  return (
    <div className='navbar'>
      
       <div>
       <NavLink to="/">
        <img src={logo} alt="whatcha cookin logo" width={50} />
       </NavLink>
      </div>
      
        
      {isLoggedIn === true ? (

        <div>
          <NavLink to="/" className={assignClassName}>
            <button >Home</button>
          </NavLink>
          <NavLink to="/recipes-list" className={assignClassName}>
            <button >Recipes</button>
          </NavLink>
          <NavLink to="/find-friends" className={assignClassName}>
            <button >Friends</button>
          </NavLink>
          
          <NavLink to="/profile/my-profile" className={assignClassName}>
            <button >My Profile</button>
          </NavLink>
          


          <span className="nav-logout">
            <button  onClick={handleLogout}>Log out</button>
          </span>
      </div> 

      ) : (

        <div>
          <NavLink to="/" className={assignClassName}>
            <button >Home</button>
          </NavLink>
          <NavLink to="/recipes-list" className={assignClassName}>
            <button >Recipes</button>
          </NavLink>
          <NavLink to="/signup" className={assignClassName} >
            <button >Sign up</button>
          </NavLink>
          <NavLink to="/login" className={assignClassName}>
            <button >Log in</button>
          </NavLink>
          </div>
      )}

    </div>
  )
}

export default Navbar