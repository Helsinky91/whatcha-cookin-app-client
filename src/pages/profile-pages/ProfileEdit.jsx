import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfileService, editProfileService, deleteProfileService, tagProfileInfoService } from '../../services/profile.services'
import { AuthContext } from "../../context/auth.context"
import { uploadImageService } from '../../services/upload.services'


function ProfileEdit() {

  const { authenticaUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const {userId} = useParams()

  //states 
  const [ usernameInput, setUsernameInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ allTags, setAllTags ] = useState()
  const [ emailInput, setEmailInput ] = useState()
  const [ descriptionInput, setDescriptionInput ] = useState()


  //state for the cloudinary img
  const [ imageURL, setImageURL ] = useState("")
  const [ isUploadingImage, setIsUploadingImage ] = useState(false)

  const [ isFetching, setIsFetching ] = useState(true)


  //hanglechanges 
  const handleNameChange = (event) => setUsernameInput(event.target.value)
  const handleTagChange = (event) => {
    let value = Array.from(event.target.selectedOptions, option => option.value)
    setTagInput(value)
  }
  const handleEmailChange = (event) => setEmailInput(event.target.value)
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)

 

  useEffect(() => {
    getData()
  }, [])

  const getData = async (event) => {
    
    try {
    
    const response = await getProfileService(userId)

    //to set the actual value on the fields
    setUsernameInput(response.data.username)
    setImageURL(response.data.image)
    setTagInput(response.data.tag)
    setEmailInput(response.data.email)
      
    const tagData = await tagProfileInfoService()
      setIsFetching(false)
      setAllTags(tagData.data)

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
            image: imageURL,
            tag: tagInput,
            email: emailInput,
            description: descriptionInput,
          }

        //llamamos al servicio de update pasando Id y data a actualizar
        await editProfileService(userId, updatedProfile)

        //redirect
        navigate("/profile/my-profile")

    } catch (error) {
        navigate("/error")                  
    }
  }
  const handleUploadImage = async (event) => {
    setIsUploadingImage(true)

    // tengo que insertar la imagen en un objeto de JS capaz de transmitir archivos FE - BE
    const sendForm = new FormData()
    sendForm.append("image", event.target.files[0])
    // "image" debe ser el mismo nombre de la ejecución del middleware uploader.single("image")
    
    try {
      // contactar a cloudinary (por el BE, service) para subir la imagen y recibir el URL
      const response = await uploadImageService(sendForm)
      // subir el url al estado para la creacion del ToDo
      setImageURL(response.data.image)
      setIsUploadingImage(false)

    } catch (error) {
      navigate("/error")
      
    }
  }
  

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
 
  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }
  

  return (
    <div>

    <h1>Edit your profile</h1>

     <div>
     <form > 
     

        <label htmlFor="image">Upload a profile pic:</label>
        <input  type="file" name="image"  onChange={handleUploadImage} /> 
        {/* con bootstrap nos dará un Id para la img */}
        <br/>

        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={usernameInput} onChange={handleNameChange} />
        <br/>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" value={emailInput} onChange={handleEmailChange} />
        <br/>
      
        <label htmlFor='tag'>Tag:
          <select name="tag" multiple onChange={handleTagChange} >
            {allTags.map((eachEl, index) =>{
              return(
              <option selected={tagInput.includes(eachEl) ? true : false} key={index} value={eachEl}>{eachEl}</option>
              )
            })}
          </select>
        </label> 
        <label htmlFor="description">Sobre mí:</label>
        <input type="text" name="description" value={descriptionInput} onChange={handleDescriptionChange} />

        <br />
        {isUploadingImage === true && <p>...subiendo imagen</p>}
        {imageURL !== "" 
        ? <img src={imageURL} atl="image" width={200}/> 
        : <p>Seleccione imagen</p>
        } 
        <br/>
        <button onClick={handleUpdate}>Submit changes</button>

    </form>

    
      <button onClick={deleteUser}>Delete profile</button>
      
     </div>


    </div>
  )
}

export default ProfileEdit