import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { editProfileService } from '../../services/profile.services'



function ProfileEdit() {

  const navigate = useNavigate()

  const {profileId} = useParams()

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

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
    
    const response = await editProfileService(profileId)
    console.log(response.data)

    //para que se visualice la info actual en los campos
    setUsernameInput(response.data.username)
    setProfileImgInput(response.data.photo)
    setTagInput(response.data.tag)
    setEmailInput(response.data.email)


    } catch(err) {
        navigate("/error")
    }

  }
  
  return (
    <div>

    <h1>Edit your profile</h1>

     <div>
                                                        {/* enctype is used for Cloudinary */}
     <form action="/profile/{id}/edit/" method="POST" enctype="multipart/form-data">
        
        <label for="profilePicImage">Upload a profile pic:</label>
        <input  type="file" name="profilePicImage" value={profileImgInput}/>
            {/* type="file" and class is  is used for Cloudinary */}
        <br/>
        <label for="firstName">Username:</label>
        <input type="text" name="firstName" value={usernameInput}/>
        <br/>
        <label for="email">Email:</label>
        <input type="email" name="email" value={emailInput}/>
        <br/>
        <label for="tags">Tags:</label>
        <input type="text" name="tags" value={tagInput}/>
    
        <br/>
        {/* functionality */}
        <button>Submit changes</button>

    </form>

        {/* functionality */}
    
      <button>delete</button>
      
     </div>


    </div>
  )
}

export default ProfileEdit