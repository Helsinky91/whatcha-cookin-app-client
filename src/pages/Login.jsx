import React, { useContext } from 'react'
import { useState } from "react";
import { loginService } from '../services/auth.services';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


function Login() {

  //config el uso de authenticaUser 
  const { authenticaUser } = useContext(AuthContext)

  //config el uso de navigate
  const navigate = useNavigate()

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    //get user's credentials
    const userCredentials = {
      email: email,   
      password: password   
    }

    try {
      //validate with BE with auth.services.js
      const response = await loginService(userCredentials)

      //get the Token and store it in "authToken"
      localStorage.setItem("authToken", response.data.authToken)
        
      //invoke Token validation (in auth.context)
      authenticaUser()

      //redirect user
      navigate("/profile/my-profile")
      
    }catch (err) {
      if(err.response && err.response.status === 400) {
        //si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(err.response.data.errorMessage)
      } else {
        //si el error es otro(500) entonecs sí redirecciono a /error
        navigate('/error')
      }
    }
  }

  return (
    <div className="auth-page" >

      <h1>🍳🍳 Log In</h1>

      <form  onSubmit={handleLogin}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
          <br />
        <button type="submit">Login</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        {/* {errorMessage !== "" && <p>{errorMessage}</p>} */}

      </form>
      
    </div>
  );
}

export default Login;