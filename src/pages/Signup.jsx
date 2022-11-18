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
  
  //to display the error message
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

    try {
      //contact BackEnd to create the user (with the auth.service.js)
      await signupService(newUser)

      //redirect to login
      navigate("/login")
      

    } catch (err) {
      if (err.response && err.response.status === 400) {
        //if error is 400 stay in component and show error message
        setErrorMessage(err.response.data.errorMessage)
      } else {
        //if error 500 redirect to /error
        navigate('/error')
      }
    }
  };

  return (
    <div className="auth-page btn">

      <h1>👨‍🍳👩‍🍳 Sign Up</h1>

      <form onSubmit={handleSignup}>

        <label>Choose a username:</label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />

        <label>Enter your email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Create a password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <br />
        <button type="submit">Signup</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}

      </form>

    </div>
  );
}

export default Signup;