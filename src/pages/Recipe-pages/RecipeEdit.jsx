import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import { editRecipeService, recipeDetailsService } from '../../services/recipes.services'


function RecipeEdit() {

  //set up state for all form fields:
  const [ nameInput, setNameInput ] = useState()
  const [ recipeImgInput, setRecipeImgInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ desciptionInput, setDescriptionInput] = useState()
  const [ stepsInput, setStepsInput ] = useState()
  const [ typeOfFoodInput, setTypeOfFoofdInput ] = useState()
  const [ IngredientsInput, setIngredientsInput ] = useState()

    //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value)
  const handleImgChange = (event) => setRecipeImgInput(event.target.value)
  const handleTagChange = (event) => setTagInput(event.target.value)
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)
  const handleStepsChange = (event) => setStepsInput(event.target.value)
  const handleTypeOfFoodChange = (event) => setTypeOfFoofdInput(event.target.value)
  const handleIngredientsChange = (event) => setIngredientsInput(event.target.value)
  const navigate = useNavigate()
  const {recipeId} = useParams()


  useEffect(() => {
    getData()
  }, [])

  const getData = async (event) => {
    
    try {
    
    const response = await recipeDetailsService(recipeId)
    console.log("response", response)
const { name, photo, tag, description, steps, typeOfFood, ingredients } = response.data
    //to set the actual value on the fields
    setNameInput(name)
    setRecipeImgInput(photo)
    setTagInput(tag)
    setDescriptionInput(description)
    setStepsInput(steps)
    setTypeOfFoofdInput(typeOfFood)
    setIngredientsInput(ingredients)


    } catch(err) {
        navigate("/error")
    }

  }

  const updateRecipe = async (event) => {
    event.preventDefault();

    try {
        const editRecipe = {
          name: nameInput,
          tag: tagInput,
          description: desciptionInput,
          steps: stepsInput,
          photo: recipeImgInput, //! req.file?.path,
          typeOfFood: typeOfFoodInput,
          ingredients: IngredientsInput
        }
      await editRecipeService(recipeId, editRecipe)
        navigate("/recipes-list")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <h1>Edita la receta</h1>
        <form>
        <label htmlFor="recipeImage">Ingredient's image</label>
        <input value={recipeImgInput} type="file" name="recipeImage" onChange={handleImgChange} />
            {/* type="file" and class is  is used for Cloudinary */}
        
            <br />

        <label htmlFor='name'>Name</label>
        <input value={nameInput} type="text" name="name" onChange={handleNameChange} />
        
          <br />
        <label htmlFor='tag'>Tag:</label>
        <input value={tagInput} type="text" name="tag" onChange={handleTagChange}/>

        {/* OR SELECT OPTION */}
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
    

            
            <br />
        

      <button onClick={updateRecipe}>Guarda los cambios</button>


        </form>





    </div>
  )
}

export default RecipeEdit