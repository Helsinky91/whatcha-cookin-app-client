import React, { useEffect } from 'react'
import { createRecipeService, tagInfoService, typeOfFoodInfoService } from '../services/recipes.services'
import { useState } from 'react'
import { uploadImageService } from '../services/upload.services'
import { useNavigate } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function RecipeAdd(props) {

  const navigate = useNavigate()

  //set up state for all form fields:
  const [nameInput, setNameInput] = useState("")
  const [tagInput, setTagInput] = useState()
  const [allTags, setAllTags] = useState()
  const [createdByInput, setCreatedByInput] = useState()
  const [desciptionInput, setDescriptionInput] = useState()
  const [stepsInput, setStepsInput] = useState("")
  const [allTypeOfFood, setallTypeOfFoofd] = useState()
  const [typeOfFoodInput, setTypeOfFoofdInput] = useState()
  const [ingredientsInput, setIngredientsInput] = useState("")
  //state for the cloudinary img
  const [imageURL, setImageURL] = useState("")
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [errorMessage, setErrorMessage] = useState("");


  //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value)
  const handleTagChange = (event) => {
    let value = Array.from(event.target.selectedOptions, option => option.value)
    setTagInput(value)
  }
  const handleCreatedByChange = (event) => setCreatedByInput(event.target.value)
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)
  const handleStepsChange = (event) => setStepsInput(event.target.value)
  const handleTypeOfFoodChange = (event) => {
    let value = Array.from(event.target.selectedOptions, option => option.value)
    setTypeOfFoofdInput(value)
  }
  const handleIngredientsChange = (event) => setIngredientsInput(event.target.value)


  useEffect(() => {
    getData()
  }, [])

  const getData = async (event) => {

    try {
      //calling service to get utils/tag info from BE
      const tagData = await tagInfoService()
      setAllTags(tagData.data)

      //calling service to get utils/typeOfFood info from BE
      const typeOfFoodData = await typeOfFoodInfoService()
      setIsFetching(false)
      setallTypeOfFoofd(typeOfFoodData.data)

    } catch (err) {
      navigate("/error")
    }
  }

  const addNewRecipe = async (event) => {
    event.preventDefault();
    if (nameInput === "" || ingredientsInput === "" || stepsInput === "") {
      alert("El nombre de la receta, los ingredientes y los pasos deben estar rellenados!")
      return
    }
    //to send new data to BE
    const newRecipe = {
      name: nameInput,
      tag: tagInput,
      createdBy: createdByInput,
      description: desciptionInput,
      steps: stepsInput,
      image: imageURL,
      typeOfFood: typeOfFoodInput,
      ingredients: ingredientsInput
    }
    try {
      //calling service that creates all recipes to BE
      await createRecipeService(newRecipe)
      props.getData()
      props.hideForm()

    } catch (error) {
      if (error.response && error.response.status === 400) {
        //if error is 400 stay in component and show error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }
    }
  }
  //function to update img from Cloudinary
  const handleUploadImage = async (event) => {

    setIsUploadingImage(true)
    const sendForm = new FormData()
    sendForm.append("image", event.target.files[0])

    try {
      //calling service that updates image
      const response = await uploadImageService(sendForm)
      setImageURL(response.data.image)
      setIsUploadingImage(false)
    } catch (error) {
      navigate("/error")

    }
  }
  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100} />
      </div>
    )

  }

  return (
    <div className="btn bottom-padding">

      <form>


        <label htmlFor="image" class="form-label"></label>
        <input class="form-control" type="file" id="formFile" name="image" onChange={handleUploadImage} />

        <br />

        <FloatingLabel controlId="floatingInputGrid" label="name" className="mb-3">
          <Form.Control type="text" name="name" value={nameInput} onChange={handleNameChange} />
        </FloatingLabel>

        {/* <label htmlFor='name'>Name</label>
        <input value={nameInput} type="text" name="name" onChange={handleNameChange} /> */}

        <label htmlFor="tag">Tag: </label>
        <select name="tag" multiple onChange={handleTagChange} >
          {allTags.map((eachEl, index) => {
            return (
              <option key={index} value={eachEl}>{eachEl}</option>
            )
          })}
        </select>

        <label htmlFor='typeOfFood'>Type Of Food:</label>
        <select name="typeOfFood" multiple onChange={handleTypeOfFoodChange} >
          {allTypeOfFood.map((eachEl, index) => {
            return (
              <option key={index} value={eachEl}>{eachEl}</option>
            )
          })}
        </select>

        <br />

        <FloatingLabel controlId="floatingTextarea2" label="ingredients" className="mb-3" >
          <Form.Control as="textarea" type="text" name="ingredients" value={ingredientsInput} onChange={handleIngredientsChange} style={{ height: '100px' }} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="description" className="mb-3" >
          <Form.Control as="textarea" type="text" name="description" value={desciptionInput} onChange={handleDescriptionChange} style={{ height: '100px' }} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="steps" className="mb-3" >
          <Form.Control as="textarea" type="text" name="steps" value={stepsInput} onChange={handleStepsChange} style={{ height: '100px' }} />
        </FloatingLabel>

        <input hidden={true} value={createdByInput} type="text" name="steps" onChange={handleCreatedByChange} />

        {isUploadingImage === true && <p>...subiendo imagen</p>}
        {imageURL !== ""
          ? <img src={imageURL} alt="image" width={200} />
          : <p>
            {/* <img src={"https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png"} alt="default pic" /> */}
            select a picture</p>
        }

        <br />
        {errorMessage !== "" && <p className='error-message'>{errorMessage}</p>}


        <button onClick={addNewRecipe}>A????delo!</button>
        {/* // </Row>       */}
      </form>





    </div>
  )
}

export default RecipeAdd