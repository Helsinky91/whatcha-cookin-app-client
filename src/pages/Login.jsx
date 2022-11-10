import React, { useContext } from 'react'
import { useState } from "react";
import { loginService } from '../services/auth.services';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


function Login() {

  // //config el uso de authenticaUser 
  // const {authenticaUser } = useContext(AuthContext)

  //  //config el uso de navigate
  //  const navigate = useNavigate()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    // //1. recopilar credenciales del user
    // const userCredentials = {
    //   email: email,    //el email del estado
    //   password: password   //el password del estado
    // }

    // try {
    //   //2. contactar con backend para validarlo
    //   const response = await loginService(userCredentials)
    //   console.log(response);

    //   //3. recibir el Token
    //   console.log(response.data.authToken)

    //   //4. hacer algo con el Token
    //      //método localStorage para guardar info del Token=> localStorage.setItem()  
    //   localStorage.setItem("authToken", response.data.authToken)
    //   //arg1: el nombre de lo q vamos a guardar
    //   //arg2: el valor de lo q vamos a guardar

    //     //en este punto debemos guardar info de q el user se ha loggeado
    //     //esta info estará en un estado global (context)
        
    //     //invocar la funcion de context que valida el Token
    //     authenticaUser()

    //       //redirect user
    //       navigate("/profile")
      
    // } catch (error) {
    //   console.log(error.response.status)
    //   // navigate('/error')
    //   //si dejamos solo navigate('/error') independientemente de si hay error 
    //   //o no con el newUser, nos manda a error

    //   if(error.response && error.response.status === 400) {
    //     //si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
    //     setErrorMessage(error.response.data.errorMessage)
    //   } else {
    //     //si el error es otro(500) entonecs sí redirecciono a /error
    //     navigate('/error')
    //   }
    // }
  }

  

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        {/* {errorMessage !== "" && <p>{errorMessage}</p>} */}

      </form>
      
    </div>
  );
}

export default Login;