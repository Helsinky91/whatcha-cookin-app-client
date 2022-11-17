import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate, useParams } from 'react-router-dom'


function IsAdmin(props) {
    
    const { isLoggedIn } = useContext(AuthContext)
    const { userId } = useParams()
   
    if (isLoggedIn === true && userId.role === "admin" ) {
        return props.children

        //if not, redirect to /login
    } else {
        return <Navigate to='/login'/> 
    }              
}
    
  return (
    <div>

    </div>
  )
}

export default IsAdmin