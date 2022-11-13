import React from 'react'
import { createIngredientService } from '../services/ingredient.services'
import { useState } from 'react'



function IngredientAdd(props) {

    //set up state for all form fields:
    const [ nameInput, setNameInput ] = useState()
    const [ IngredientImgInput, setIngredientImgInput ] = useState()
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
    const handleSubmit = async (event) => {
    event.preventDefault()

    const newIngredient = {
        name: nameInput,
        tag: tagInput,
        comment: commentInput, 
        photo: IngredientImgInput, //! o req.file?.path,
        category: categoryInput
    }
    
    try {
        //contact DB with ingredient.services.js
      await createIngredientService(newIngredient)
      //si JS llega a este punto es poq el ToDo se ha creado correctamente
      /*tenemos q indicarle a React q la lista se ha actualizado, porq event.preventDefault
      no deja que se vea la data */
      //!change actualizarLista
      props.updateIngrList() //le hemos pasado el getData from todoList

    } catch (error) {
       console.log(error)
    }
  }


  return (
    <div>

      <form>
        <label for="IngredientImage">Ingredient's image</label>
        <input value={IngredientImgInput} type="file" name="IngredientImage" onChange={handleImgChange} />
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
        

      <button onClick={handleSubmit}>Add new ingredient</button>
      </form>

    </div>
  )
}

export default IngredientAdd