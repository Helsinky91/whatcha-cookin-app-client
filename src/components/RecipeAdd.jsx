import React from 'react'
import { createRecipeService } from '../services/recipes.services'
import { useState } from 'react'
import IngredientAdd from './IngredientAdd'


function RecipeAdd(props) {
  
  //set up state for all form fields:
  const [ nameInput, setNameInput ] = useState()
  const [ recipeImgInput, setRecipeImgInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ createdByInput, setCreatedByInput ] = useState()
  const [ desciptionInput, setDescriptionInput] = useState()
  const [ stepsInput, setStepsInput ] = useState()
  const [ typeOfFoodInput, setTypeOfFoofdInput ] = useState()
  const [ IngredientsInput, setIngredientsInput ] = useState()
  const [formIsShowing, setFormIsShowing] = useState(false)
  // 
  
  //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value)
  const handleImgChange = (event) => setRecipeImgInput(event.target.value)
  const handleTagChange = (event) => setTagInput(event.target.value)
  const handleCreatedByChange = (event) => setCreatedByInput(event.target.value)
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)
  const handleStepsChange = (event) => setStepsInput(event.target.value)
  const handleTypeOfFoodChange = (event) => setTypeOfFoofdInput(event.target.value)
  const handleIngredientsChange = (event) => setIngredientsInput(event.target.value)

  const addNewRecipe = async (event) => {
    event.preventDefault();

    const newRecipe = {
      name: nameInput,
      tag: tagInput,
      createdBy: createdByInput,
      description: desciptionInput,
      steps: stepsInput,
      photo: recipeImgInput, //! req.file?.path,
      typeOfFood: typeOfFoodInput,
      ingredients: IngredientsInput
    }
    try {
      await createRecipeService(newRecipe)
      props.addManyRecipes()
      
    } catch (error) {
      console.log(error)
    }
  }

  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing)
        //! error cuando se añade uno, no se rellenan los campos

  return (
    <div>
      <div>
     <button onClick={toggleForm}>Add Ingredient</button> 
     {formIsShowing === true 
    //  ? <IngredientAdd updateIngrList={getData}/>
    ? <IngredientAdd/>
     : null }
    </div> 
      <form>
        <label for="recipeImage">Ingredient's image</label>
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
        <input hidden="true" value={createdByInput} type="text" name="steps" onChange={handleCreatedByChange}/>

            
            <br />
        

      <button onClick={addNewRecipe}>Create!</button>
      </form>





    </div>
  )
}

export default RecipeAdd