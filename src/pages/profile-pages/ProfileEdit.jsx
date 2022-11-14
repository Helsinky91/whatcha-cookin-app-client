import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfileService, updateProfileService, deleteProfileService } from '../../services/profile.services'
import { AuthContext } from "../../context/auth.context"



function ProfileEdit() {

  const { authenticaUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const {userId} = useParams()

  //states 
  const [ usernameInput, setUsernameInput ] = useState()
  const [ profileImgInput, setProfileImgInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ emailInput, setEmailInput ] = useState()

  //hanglechanges 
  const handleNameChange = (event) => setUsernameInput(event.target.value)
  const handleImgChange = (event) => setProfileImgInput(event.target.value)
  const handleTagChange = (event) => setTagInput(event.target.value)
  const handleEmailChange = (event) => setEmailInput(event.target.value)
  console.log("handlechangename: ",handleNameChange)

  useEffect(() => {
    getData()
  }, [])

  const getData = async (event) => {
    
    try {
    
    const response = await getProfileService(userId)
    console.log( "get profile service :", response.data)

    //to set the actual value on the fields
    setUsernameInput(response.data.username)
    setProfileImgInput(response.data.photo)
    setTagInput(response.data.tag)
    setEmailInput(response.data.email)


    } catch(err) {
        navigate("/error")
    }

  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
        //recopilamos los valores a actualizar
        const updatedProfile = {
            username: usernameInput,
            photo: profileImgInput,
            tag: tagInput,
            email: emailInput,
          }

        //llamamos al servicio de update pasando Id y data a actualizar
        updateProfileService(userId, updatedProfile)

        //redirect
        navigate("/profile/my-profile")

    } catch (error) {
        navigate("/error")
    }
  }
  
  //!si es admin > puede borrar el perfil
  //! si es tu propio perfil > puede borrar el perfil

  // const deleteUser= (ItemName) => {
  //   const profileList = listToShow.filter((eachEl) => (eachEl.name === ItemName) ? false : true)
  //   setListToShow(filteredList);
  // }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
      //invoke authenticaUser() to change states
    authenticaUser()
  }

  const deleteUser = () => {
   try {
    deleteProfileService(userId) 
    //!si eres admin > navigate lista profiles/amigos, sino log out y a home.
    handleLogout()
    navigate("/")
   }catch(error) {
    navigate("/error")
   }
   
    
  } 


  return (
    <div>

    <h1>Edit your profile</h1>

     <div>
     <form >
        
        {/* <label htmlFor="profilePicImage">Upload a profile pic:</label>
        <input  type="file" name="profilePicImage" value={profileImgInput} onChange={handleImgChange} />  */}
            {/* type="file" and class is  is used for Cloudinary */}
        <br/>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={usernameInput} onChange={handleNameChange} />
        <br/>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" value={emailInput} onChange={handleTagChange} />
        <br/>
        <label htmlFor="tags">Tags:</label>
        <input type="text" name="tags" value={tagInput} onChange={handleEmailChange} />
    
        <br/>
        <button onClick={handleUpdate}>Submit changes</button>

    </form>

        {/* functionality */}
    
      <button onClick={deleteUser}>Delete profile</button>
      {/* <Button type="danger" onClick={() => toDelete(props.eachItem.name)}> Delete </Button> */}
      
     </div>


    </div>
  )
}

export default ProfileEdit