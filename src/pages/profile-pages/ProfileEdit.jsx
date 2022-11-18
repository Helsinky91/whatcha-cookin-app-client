import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfileService, editProfileService, deleteProfileService, tagProfileInfoService } from '../../services/profile.services'
import { AuthContext } from "../../context/auth.context"
import { uploadImageService } from '../../services/upload.services'
import ClockLoader from "react-spinners/ClockLoader";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ProfileEdit() {

  const { authenticaUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const { userId } = useParams()

  //states 
  const [usernameInput, setUsernameInput] = useState()
  const [tagInput, setTagInput] = useState()
  const [allTags, setAllTags] = useState()
  const [emailInput, setEmailInput] = useState()
  const [descriptionInput, setDescriptionInput] = useState()


  //state for the cloudinary img
  const [imageURL, setImageURL] = useState("")
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const [isFetching, setIsFetching] = useState(true)


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

    } catch (err) {
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
      if (error.response && error.response.status === 400) {
        //si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }
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
      handleLogout()
      navigate("/")
    } catch (error) {
      navigate("/error")
    }
  }

  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100} />
      </div>
    )
  }


  return (
    <div>
      <div className="btn bottom-padding">

        <h1>Edit your profile</h1>


        <form >


          <label htmlFor="image" class="form-label"></label>
          <input class="form-control" type="file" id="formFile" name="image" onChange={handleUploadImage} />

          <br />


          <FloatingLabel controlId="floatingInputGrid" label="name" className="mb-3">
            <Form.Control type="text" name="name" value={usernameInput} onChange={handleNameChange} />
          </FloatingLabel>



          <FloatingLabel controlId="floatingTextarea2" label="description" className="mb-3" >
            <Form.Control as="textarea" type="email" name="description" value={emailInput} onChange={handleEmailChange} style={{ height: '100px' }} />
          </FloatingLabel>

          <label htmlFor='tag'>Tag:  </label>
          <select name="tag" multiple onChange={handleTagChange} >
            {allTags.map((eachEl, index) => {
              return (
                <option selected={tagInput.includes(eachEl) ? true : false} key={index} value={eachEl}>{eachEl}</option>
              )
            })}
          </select>


          <br />
          <FloatingLabel controlId="floatingTextarea2" label="description" className="mb-3" >
            <Form.Control as="textarea" type="text" name="description" value={descriptionInput} onChange={handleDescriptionChange} style={{ height: '100px' }} />
          </FloatingLabel>
          {isUploadingImage === true && <p>...subiendo imagen</p>}
          {imageURL !== ""
            ? <img src={imageURL} atl="image" width={200} />
            : <p>Seleccione imagen</p>
          }
          <br />
          <button onClick={handleUpdate}>Submit changes</button>
          {errorMessage !== "" && <p className='error-message'>{errorMessage}</p>}

        </form>
      </div>

      <div>
        <button className="btndelete" onClick={deleteUser}>Delete profile</button>

      </div>


    </div>

  )
}


export default ProfileEdit