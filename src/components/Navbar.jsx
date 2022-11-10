import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {AuthContext} from "../context/auth.context"

function Navbar() {
  //  const {authenticaUser, isLoggedIn } = useContext(AuthContext)

  return (
    <div>
        
              <div>
            <NavLink to="/" >
              <button>Home</button>
            </NavLink>
            <NavLink to="/profile" >
              <button>Profile</button>
            </NavLink>
              <span className="nav-inactive">
            <button >Log out</button>
            </span>
              </div>
            

              <div>
            <NavLink to="/signup"  >
              <button>Sign up</button>
            </NavLink>
            <NavLink to="/login" >
              <button>Log in</button>
            </NavLink>
            </div>
            





    </div>
  )
}

export default Navbar