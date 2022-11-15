import React from 'react'
import { createIngredientService } from '../services/ingredient.services'
import { useState } from 'react'



function IngredientAdd(props) {

    //set up state for all form fields:
    const [ nameInput, setNameInput ] = useState()
    const [ ingredientImgInput, setIngredientImgInput ] = useState()
    const [ tagInput, setTagInput ] = useState()
    const [ commentInput, setCommentInput ] = useState()
    const [ categoryInput, setCategoryInput] = useState()

    
    //set up handlechanges for all the fields:
    const handleNameChange = (event) => setNameInput(event.target.value)
    const handleImgChange = (event) => setIngredientImgInput(event.target.value)
    const handleTagChange = (event) => setTagInput(event.target.value)
    const handleCommentChange = (event) => setCommentInput(event.target.value)
    const handleCategoryChange = (event) => setCategoryInput(event.target.value)

    //to send info to DB:
    const addNewIngredient = async (event) => {
    event.preventDefault()

    const newIngredient = {
        name: nameInput,
        tag: tagInput,
        comment: commentInput, 
        image: ingredientImgInput, //! o req.file?.path,
        category: categoryInput
    }
    
    try {
        //contact DB with ingredient.services.js
      await createIngredientService(newIngredient)
      props.hideForm()

    } catch (error) {
       console.log(error)
    }
  }


  return (
    <div>

      <form>
        <label for="IngredientImage">Ingredient's image</label>
        <input value={ingredientImgInput} type="file" name="IngredientImage" onChange={handleImgChange} />
            {/* type="file" and class is  is used for Cloudinary */}
        
            <br />

        <label htmlFor='name'>Name</label>
        <input value={nameInput} type="text" name="name" onChange={handleNameChange} />
        
          <br />
        <label htmlFor='tag'>Tag:</label>
        <input value={tagInput} type="text" name="tag" onChange={handleTagChange}/>

        {/* OR SELECT OPTION */}
        
           <br />

        <label htmlFor='comment'>comment</label>
        <input value={commentInput} type="text" name="comment" onChange={handleCommentChange}/>
        
           <br />
        <label htmlFor='category'>category</label>
        <input value={categoryInput} type="text" name="category" onChange={handleCategoryChange}/>

            
            <br />
        

      <button onClick={addNewIngredient}>Añádelo!</button>
      </form>

    </div>
  )
}

export default IngredientAdd