import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'


function IsAdmin(props) {

    //we call user state that contains the info of the user that is logged in
    const { user } = useContext(AuthContext)
    
    if (user.role === "admin" ) {
        return props.children
    }               
}

export default IsAdmin