import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef'
import React, { useContext }from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { favRecipeService, deleteFavRecipeService, userFavRecipeService } from '../../services/recipes.services'
import { deleteRecipeService, recipeDetailsService } from '../../services/recipes.services'
import { AuthContext } from "../../context/auth.context"
import { createCommentService, getCommentService } from '../../services/comment.services'

//!only if it's admin -- acabar de configurar

  // const deleteFood = (ItemName) => {
  //   const filteredList = recipeListToShow.filter((eachEl) => (eachEl.name === ItemName) ? false : true)
  //   setRecipeListToShow(filteredList);
 //acabar config ironnutricion lab


function RecipeDetails() {
  const { authenticaUser } = useContext(AuthContext)
  // console.log(authenticaUser)
  const navigate = useNavigate();


  const { recipeId } = useParams()
  const [ recipeDetails, setRecipeDetails] = useState(null)
  const [ recipeComments, setRecipeComments] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)
  const [ addDeleteFav, setAddDeleteFav ] = useState(true)
  const [ newCommentInput, setNewCommentInput ] = useState("")

  

  const handleCommentChange = (event) => setNewCommentInput(event.target.value)

  useEffect(() => {
    getData()
  }, [])
  
const getData = async () => {
  try {
      const response = await recipeDetailsService(recipeId)
      //3. actualizar el estado con la data
      setRecipeDetails(response.data)
      setIsFetching(false)
      const response2 = await getCommentService(recipeId)
      setRecipeComments(response2.data)
      console.log("response2", response2.data)

  } catch (error) {
    console.log(error)
    navigate("/error")
  }
}

            //Intent per fer que al inici comprovi si la recepta esta a favoritos per canviar el boto de añadir
// const checkFav = async () => {
//   try {
//     const response = await userFavRecipeService(recipeId)
//     console.log("response id", response)
//     if (response.data._id === recipeId){
  
//       setAddDeleteFav(true)
//     } else {
//       setAddDeleteFav(false)
//     }
//   } catch (error) {
    
//   }
// }



if (isFetching === true) {
  return <h3>...loading</h3>
}

const handleDelete = async(event) => {

  try {
    // event.preventDefault()
    await deleteRecipeService(recipeId)

      navigate("/recipes-list")

  } catch (error) {
      console.log(error)
      navigate("/error")
  }

}

const addRecipeFav = async () => {
  try {
    await favRecipeService(recipeId)
    setAddDeleteFav(!addDeleteFav)
  } catch (error) {
    console.log(error)
  }
}


const delRecipeFav = async () => {
  try {
    await deleteFavRecipeService(recipeId)
    setAddDeleteFav(!addDeleteFav)
  } catch (error) {
    console.log(error)
  }
  const { name, tag, description, steps, image, typeOfFood, ingredients } = recipeDetails


  
const addComment = async (event) => {
  event.preventDefault();

  const newComment = {
    comment: newCommentInput
}
  try {
    await createCommentService(newComment)
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div>
    
    <h4>{`Detalles de la receta ${name}`} </h4>
        <div>
    
     <img src={image} alt={name} width={150}/> 
    {tag !== undefined ? <h4>{`Tag: ${tag}`}</h4> : <h4>Tag: no especificado</h4> }
    {description !== undefined ? <h4>{`Descripcción: ${description}`}</h4> : <h4>Descripción: no especificada</h4> }
    {steps !== undefined ? <h4>{`Paso a paso: ${steps}`}</h4> : <h4>Paso a paso: no especificado</h4> }
    {typeOfFood !== undefined ? <h4>{`Tipo de receta: ${typeOfFood}`}</h4> : <h4>Tipo de receta: no especificado</h4> }
    {ingredients !== undefined ?   <h4>{`Ingredientes: ${ingredients}`}</h4> : <h4>Ingredientes: no especificados</h4> }
    
    <Link to={`/recipes/${recipeId}/edit`}><button>Editar</button></Link>
   

    <button onClick={addRecipeFav}>Añadir a Favoritos</button> 
  
    <button onClick={delRecipeFav}>Quitar de Favoritos</button> 
    

    <h3>Deja tu comentario</h3>
    <form>
    <label htmlFor="name"></label>
     <input id="name" type="text" value={handleCommentChange}/>
     <button onClick={addComment}>Añádelo!</button>
    </form> createCommentService
    
<h3>Comentarios sobre esta receta</h3>
  {recipeComments.map((eachComment) => {
    return (
      <h3>{`${eachComment.comment}`}</h3>
    )
  })}
    <button onClick={handleDelete}>Borrar</button>

    

    </div>
    
    
    
    </div>
  )
}
}

export default RecipeDetails