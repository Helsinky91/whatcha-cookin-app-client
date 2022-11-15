import React from 'react'
import { createIngredientService } from '../services/ingredient.services'
import { useState } from 'react'
import { uploadImageService } from '../services/upload.services'
import { useNavigate } from 'react-router-dom'



function IngredientAdd(props) {

  const navigate = useNavigate()


  //set up state for all form fields:
  const [ nameInput, setNameInput ] = useState()
  const [ tagInput, setTagInput ] = useState()
  const [ commentInput, setCommentInput ] = useState()
  const [ categoryInput, setCategoryInput] = useState()
  //state for the cloudinary img
  const [ imageURL, setImageURL ] = useState("")
  const [ isUploadingImage, setIsUploadingImage ] = useState(false)
    
  //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value)
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
      image: imageURL, 
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

      <form>
        <label for="image">Ingredient's image</label>
        <input type="file" name="image" onChange={handleUploadImage} />
        
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
        {isUploadingImage === true && <p>...subiendo imagen</p>}
        {imageURL !== "" 
        ? <img src={imageURL} atl="image" width={100}/> 
        : <p>Seleccione imagen</p>
        }     
        

      <button onClick={addNewIngredient}>Añádelo!</button>
      </form>

    </div>
  )
}

export default IngredientAdd