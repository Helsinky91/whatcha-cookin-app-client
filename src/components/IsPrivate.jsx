import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'


//wrapping component that verifies if user is logged in or not
function IsPrivate(props) {

    const { isLoggedIn } = useContext(AuthContext)

    //if isLoggedIn is true, render props.children
    if (isLoggedIn === true) {
        return props.children

        //if not, redirect to /login
    } else {
        return <Navigate to='/login' />
    }
}

export default IsPrivate