import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import { editRecipeService, recipeDetailsService, tagInfoService } from '../../services/recipes.services'
import { uploadImageService } from '../../services/upload.services'


function RecipeEdit() {
  
  const navigate = useNavigate()
  const {recipeId} = useParams()

  //set up state for all form fields:
  const [ nameInput, setNameInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ allTags, setAllTags ] = useState()
  const [ desciptionInput, setDescriptionInput] = useState()
  const [ stepsInput, setStepsInput ] = useState()
  const [ typeOfFoodInput, setTypeOfFoofdInput ] = useState()
  const [ IngredientsInput, setIngredientsInput ] = useState()
  //state for the cloudinary img
  const [ imageURL, setImageURL ] = useState("")
  const [ isUploadingImage, setIsUploadingImage ] = useState(false)
  const [isFetching, setIsFetching] = useState(true)


    //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value)
  const handleTagChange = (event) => setTagInput(event.target.value)

  // const handleTagChange = (event) => setTagInput() //array.from(event.target del selected option)
  //constante que sera option.constante +  y actualizas la constante 
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)
  const handleStepsChange = (event) => setStepsInput(event.target.value)
  const handleTypeOfFoodChange = (event) => setTypeOfFoofdInput(event.target.value)
  const handleIngredientsChange = (event) => setIngredientsInput(event.target.value)
 


  useEffect(() => {
    getData()
    // tagData()
  }, [])
  
  const getData = async (event) => {
    
    try {
      
      const response = await recipeDetailsService(recipeId)
      // console.log("response", response)
      const { name, image, tag, description, steps, typeOfFood, ingredients } = response.data
      //to set the actual value on the fields
    setNameInput(name)
    setImageURL(image)
    setTagInput(tag)
    setDescriptionInput(description)
    setStepsInput(steps)
    setTypeOfFoofdInput(typeOfFood)
    setIngredientsInput(ingredients)
     
    const tagData = await tagInfoService()
    setIsFetching(false)
    console.log("response ", tagData.data)
    setAllTags(tagData.data)
  } catch(err) {
    navigate("/error")
  }
  
}

  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }
      
   console.log("allTags:", allTags)
  const updateRecipe = async (event) => {
    event.preventDefault();

    try {
        const editRecipe = {
          name: nameInput,
          tag: tagInput,
          description: desciptionInput,
          steps: stepsInput,
          image: imageURL, 
          typeOfFood: typeOfFoodInput,
          ingredients: IngredientsInput
        }
      await editRecipeService(recipeId, editRecipe)
        navigate("/recipes-list")
    } catch (error) {
      console.log(error)
    }
  }

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

  return (
    <div>
        <h1>Edita la receta</h1>
        <form>
        <label htmlFor="image">Ingredient's image</label>
        <input type="file" name="image" onChange={handleUploadImage} /> 
        
            <br />

        <label htmlFor='name'>Name</label>
        <input value={nameInput} type="text" name="name" onChange={handleNameChange} />
        
          <br />
        {/* <label htmlFor='tag'>Tag:</label>
        <input value={tagInput} type="text" name="tag" onChange={handleTagChange}/> */} 
               
         <label htmlFor='tag'>Tag:
          <select name="tag" onChange={handleTagChange} >
            {allTags.map((eachEl) =>{
              return(
              <option value={eachEl}>{eachEl}</option>
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
        <label htmlFor='typeOfFood'>Type Of Food</label>
        <input value={typeOfFoodInput} type="text" name="typeOfFood" onChange={handleTypeOfFoodChange}/>
        <br />
        <label htmlFor='ingredients'>Ingredient</label>
        <input value={IngredientsInput} type="text" name="ingredients" onChange={handleIngredientsChange}/>
        <br />

        {isUploadingImage === true && <p>...subiendo imagen</p>}
        {imageURL !== "" 
        ? <img src={imageURL} atl="image" width={200}/> 
        : <p>Seleccione imagen</p>
        } 

            <br />
        

      <button onClick={updateRecipe}>Guarda los cambios</button>


        </form>





    </div>
  )
}

export default RecipeEdit