import { createContext, useState, useEffect } from "react";
import {verifyService} from "../services/auth.services";
import ClockLoader from "react-spinners/ClockLoader";


const AuthContext = createContext()

function AuthWrapper(props) {
  //all global states and functions

    //state to know if user is logged in. returns a Boolean
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    //state to know the info of the active logged user
    const [ user, setUser ] = useState(null) 

    //state for loagind page
    const [ isFetching, setIsFetching ] = useState(true)

    //to validate the user's Token before render App
    useEffect(() => {
        authenticaUser()
    }, [])

    //to validate user's Token and update the States
    const authenticaUser = async () => {
        //change to true so it renders the "loading" again
        setIsFetching(true)

        try {
            //feeds from auth.service.js
            const response = await verifyService()
            
            //from this point the Token is already validated in FE
            setIsLoggedIn(true)
            setUser(response.data)
            setIsFetching(false)
            // const userRole = response.data.role   
            // return userRole

        } catch (err) {
            //if there's an error, don't change the States
            setIsLoggedIn(false)
            setUser(null)
            setIsFetching(false)
        }
    }

    const passedContext = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        authenticaUser
    }

    if (isFetching === true) {
        return (
            <div className="spinner">
              <ClockLoader color="#d68736" size={200}/>
            </div> 
           )
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthWrapper,
    AuthContext
}