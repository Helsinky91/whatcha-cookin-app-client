import React, { useEffect } from 'react'
import { createRecipeService, tagInfoService, typeOfFoodInfoService } from '../services/recipes.services'
import { useState } from 'react'
import { uploadImageService } from '../services/upload.services'
import { useNavigate } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader";

function RecipeAdd(props) {
  
  const navigate = useNavigate()
  
  //set up state for all form fields:
  const [ nameInput, setNameInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ allTags, setAllTags ] = useState()
  const [ createdByInput, setCreatedByInput ] = useState()
  const [ desciptionInput, setDescriptionInput] = useState()
  const [ stepsInput, setStepsInput ] = useState()
  const [ allTypeOfFood, setallTypeOfFoofd ] = useState()
  const [ typeOfFoodInput, setTypeOfFoofdInput ] = useState()
  const [ IngredientsInput, setIngredientsInput ] = useState()
  const [ formIsShowing, setFormIsShowing ] = useState(false)
  //state for the cloudinary img
  const [ imageURL, setImageURL ] = useState("")
  const [ isUploadingImage, setIsUploadingImage ] = useState(false)
  const [ isFetching, setIsFetching ] = useState(true)

  
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
      const tagData = await tagInfoService()
      // setIsFetching(false)
    
      setAllTags(tagData.data)

      const typeOfFoodData = await typeOfFoodInfoService()
      setIsFetching(false)
      setallTypeOfFoofd(typeOfFoodData.data)
    } catch(err) {
      navigate("/error")
    }
  }


  const addNewRecipe = async (event) => {
    event.preventDefault();

    const newRecipe = {
      name: nameInput,
      tag: tagInput,
      createdBy: createdByInput,
      description: desciptionInput,
      steps: stepsInput,
      image: imageURL, 
      typeOfFood: typeOfFoodInput,
      ingredients: IngredientsInput
    }
    try {
      await createRecipeService(newRecipe)
      props.getData()
      props.hideForm()
         
    } catch (error) {
      console.log(error)
    }
  }
  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing)
  
  const handleUploadImage = async (event) => {
    
    setIsUploadingImage(true)
    
    const sendForm = new FormData()
    sendForm.append("image", event.target.files[0])
    
    try {
      const response = await uploadImageService(sendForm)
      setImageURL(response.data.image)
      setIsUploadingImage(false)
    } catch (error) {
      navigate("/error")
      
    }
  }
 
   if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100}/>
      </div> 
     )

  }

  return (
    <div class="btn bottom-padding">
      <form>
        <label htmlFor="image">Ingredient's image</label>
        <input type="file" name="image" onChange={handleUploadImage} />
        <br />

        <label htmlFor='name'>Name</label>
        <input value={nameInput} type="text" name="name" onChange={handleNameChange} />
     
          <br />
          <label>
          <select name="tag" multiple onChange={handleTagChange} >
            {allTags.map((eachEl, index) =>{
              return(
              <option key={index} value={eachEl}>{eachEl}</option>
              )
            })}
          </select>
        </label> 
        
           <br />

        <label htmlFor='description'>Description</label>
        <input value={desciptionInput} type="text" name="description" onChange={handleDescriptionChange}/>
        
           <br />
        <label htmlFor='steps'>Steps</label>
        <input value={stepsInput} type="text" name="steps" onChange={handleStepsChange}/>
        <br />
        <label htmlFor='typeOfFood'>Type Of Food:
          <select name="typeOfFood" multiple onChange={handleTypeOfFoodChange} >
            {allTypeOfFood.map((eachEl, index) =>{
              return(
              <option key={index} value={eachEl}>{eachEl}</option>
              )
            })}
          </select>
        </label> 
        <br />
        <label htmlFor='ingredients'>Ingredient</label>
        <input value={IngredientsInput} type="text" name="ingredients" onChange={handleIngredientsChange}/>
        <br />
        <input hidden="true" value={createdByInput} type="text" name="steps" onChange={handleCreatedByChange}/>
      
        {isUploadingImage === true && <p>...subiendo imagen</p>}
        {imageURL !== "" 
        ? <img src={imageURL} atl="image" width={200}/> 
        : <p>
        {/* <img src={"https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png"} alt="default pic" /> */}
          select a picture</p>
        } 
            
            <br />
        

      <button onClick={addNewRecipe}>Añádelo!</button>
      </form>





    </div>
  )
}

export default RecipeAdd