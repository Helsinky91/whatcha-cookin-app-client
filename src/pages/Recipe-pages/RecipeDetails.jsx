import React, { useContext }from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { favRecipeService, deleteFavRecipeService } from '../../services/recipes.services'
import { deleteRecipeService, recipeDetailsService } from '../../services/recipes.services'
import { AuthContext } from "../../context/auth.context"
import { createCommentService, getCommentService } from '../../services/comment.services'
import RecipeComment from '../../components/RecipeComment'
import IsAdmin from '../../components/IsAdmin'
import ClockLoader from "react-spinners/ClockLoader";
import { getProfileService } from '../../services/profile.services'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function RecipeDetails() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const { recipeId } = useParams()
  const [ recipeDetails, setRecipeDetails] = useState(null)
  const [ recipeComments, setRecipeComments] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)
  const [ addDeleteFav, setAddDeleteFav ] = useState(true)
  const [ newComment, setNewComment ] = useState("")
  const [haveFavRecipe, setHaveFavRecipe] = useState([])

  

  const handleCommentChange = (event) => setNewComment(event.target.value)

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
  try {
      const response = await recipeDetailsService(recipeId)
      setRecipeDetails(response.data)
      
      const response2 = await getCommentService(recipeId)
      setRecipeComments(response2.data)
      const response3 = await getProfileService(user._id)
      setHaveFavRecipe(response3.data.favourites)
      setIsFetching(false)

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

const handleDelete = async(event) => {
  event.preventDefault()
  try {
    await deleteRecipeService(recipeId)
      navigate("/recipes-list")

  } catch (error) {
      navigate("/error")
  }
}

const addRecipeFav = async () => {

  try {
    await favRecipeService(recipeId)
    setAddDeleteFav(!addDeleteFav)
    getData()
  } catch (error) {
    navigate("/error")

  }
}


const delRecipeFav = async () => {
  try {
    await deleteFavRecipeService(recipeId)
    setAddDeleteFav(!addDeleteFav)
    getData()
  } catch (error) {
    navigate("/error")

  }
}

const { name, tag, description, steps, image, typeOfFood, ingredients, createdBy } = recipeDetails

const addComment = async (event) => {
  event.preventDefault();
  const comment = {
    comment: newComment
  }
  try {
    await createCommentService(recipeId, comment)
    getData()
  } catch (error) {
    navigate("/error")

  }
}

  return (
    <div className="btn bottom-padding bold">
    
    <h1>{`Detalles de la receta ${name}`} </h1>
        <div>
     <img src={image} alt={name} width={240}/> 
    
    {description !== undefined ? <h2>{`${description}`}</h2> : <h2>Descripción: no especificada</h2> }
    <br />
    {steps !== undefined ? <h4> <b>Paso a paso: </b> {`${steps}`}</h4> : <h4> Paso a paso: no especificado</h4> }
    {ingredients !== undefined ?   <h4> <b>Ingredientes: </b> {`${ingredients}`}</h4> : <h4>Ingredientes: no especificados</h4> }
    {typeOfFood !== undefined ? <h5> <b>Tipo de receta: </b> {`${typeOfFood} `}</h5> : <h4>Tipo de receta: no especificado</h4> }
    {tag !== undefined ? <h5> <b>Tag: </b> {`${tag}`}</h5>  : <h5>Tag: no especificado</h5> }
    
    {createdBy.username !== undefined 
    ? <p>Created by: 
      {createdBy._id === user._id 
    ? <Link to={"/profile/my-profile"}> {`${createdBy.username}`} </Link>
    : <Link to={`/profile/${createdBy._id}/details`}> {`${createdBy.username}`} </Link> 
      } </p>
    : <p>Este usuario ya no está registrado en nuestra app</p>
    }
    
    { user._id === createdBy._id 
    ? <Link to={`/recipes/${recipeId}/edit`}><button>Editar</button></Link> 
    : <></>} 
    
   {haveFavRecipe.includes(recipeId)
    ?<button onClick={delRecipeFav}>Quitar de Favoritos</button> 
   : <button onClick={addRecipeFav}>Añadir a Favoritos</button> 
   }

  { user._id === createdBy._id
   ? <button className="btndelete" onClick={handleDelete}>Borrar la receta</button>
   :  <IsAdmin> <button className="btndelete" onClick={handleDelete}>Borrar la receta</button> </IsAdmin>
  }
  <hr className='hr-profile'/>
   
    <h3>Deja tu comentario</h3>
    
    {/* <label htmlFor="comment"></label>
     <input name="comment" type="text" value={newComment}  onChange={handleCommentChange}/> */}


     <FloatingLabel controlId="floatingTextarea2" label="comment" className="mb-3">
          <Form.Control type="text" name="comment" value={newComment}  onChange={handleCommentChange} style={{ height: '80px' }}/>
     </FloatingLabel>

     <button onClick={addComment}>Comentar</button>
   
    
  <h3>Comentarios sobre esta receta</h3>
  <RecipeComment recipeComments={recipeComments} updateComments={getData}/>
  
    </div>
    </div>
  )
}



export default RecipeDetails