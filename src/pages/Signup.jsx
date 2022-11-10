import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.services';

function Signup() {

  //config useNavigate()
  const navigate = useNavigate()

  //states to create newUser
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  //config to handle changes on the fields' form
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  //config to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    //get new user info
    const newUser = {
      username: username,
      email: email,
      password: password
    }
    //contact BackEnd to create the user (with the service)
    try {
      await signupService(newUser)

      //redireccionar a login
      navigate("/login")
      //!crear pop up para que un nuevo user rellene la info en el profile
      
    }catch (error) {
      if(error.response && error.response.status === 400) {
        //si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        //si el error es otro(500) entonecs sí redirecciono a /error
        navigate('/error')
      }
    }
  };

  return (
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>

      <label>Choose a username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />

        <label>Enter your email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Create a password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Signup</button>
        
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        {/* {errorMessage !== "" && <p>{errorMessage}</p>} */}


      </form>
      
    </div>
  );
}

export default Signup;