import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef'
import React, { useContext }from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { favRecipeService, deleteFavRecipeService } from '../../services/recipes.services'
import { deleteRecipeService, recipeDetailsService } from '../../services/recipes.services'
import { AuthContext } from "../../context/auth.context"
import { getMyProfileService } from '../../services/profile.services'


//!only if it's admin -- acabar de configurar

  // const deleteFood = (ItemName) => {
  //   const filteredList = recipeListToShow.filter((eachEl) => (eachEl.name === ItemName) ? false : true)
  //   setRecipeListToShow(filteredList);
 //acabar config ironnutricion lab


function RecipeDetails() {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext)

  const { recipeId } = useParams()
  const [ recipeDetails, setRecipeDetails] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)
  const [ addDeleteFav, setAddDeleteFav ] = useState(true)

  
  useEffect(() => {
    checkIfFav(recipeId)
    getData()
  }, [])
  
  const checkIfFav = async () => {
    try {
      const response = await getMyProfileService()
      if (response.data.favourites.includes(recipeId)) {
        setAddDeleteFav(false)
      } else {
        setAddDeleteFav(true)
      }
    } catch (error) {
      console.log(error)
      
    }
  }
const getData = async () => {
  try {
      const response = await recipeDetailsService(recipeId)
      console.log(response)
      //3. actualizar el estado con la data
      setRecipeDetails(response.data)
      setIsFetching(false)
  } catch (error) {
    console.log(error)
    navigate("/error")
  }
}

if (isFetching === true) {
  return <h3>...loading</h3>
}

const handleDelete = async(event) => {

  try {
      event.preventDefault()
      await deleteRecipeService(recipeId)
      console.log("Elemento borrado")

      // 2. Redireccionar al usuario a la lista de ToDos, "/todos"
                  //useNavigate sirve para redireccionar al usuario
      navigate("/recipes-list")

  } catch (error) {
      console.log(error)
      //cada vez que tenemos un catch(error) (un error de desarrollo, o algun problema), navegamos a una pagina de error 500
      navigate("/error")
  }

}


const addRecipeFav = async (recipeId) => {
  try {
    await favRecipeService(recipeId)
  } catch (error) {
    console.log(error)
  }
}


const delRecipeFav = async () => {
  try {
    await deleteFavRecipeService(recipeId)
    console.log("delete" )
  } catch (error) {
    console.log(error)
  }
}
  const { name, tag, description, steps, photo, typeOfFood, ingredients } = recipeDetails

  return (
    <div>
    
    <h4>{`Detalles de la receta ${name}`} </h4>
        <div>
    
    <img src={`Tag: ${photo}`} />
    {tag !== undefined ? <h4>{`Tag: ${tag}`}</h4> : <h4>Tag: no especificado</h4> }
    {description !== undefined ? <h4>{`Descripcción: ${description}`}</h4> : <h4>Descripción: no especificada</h4> }
    {steps !== undefined ? <h4>{`Paso a paso: ${steps}`}</h4> : <h4>Paso a paso: no especificado</h4> }
    {typeOfFood !== undefined ? <h4>{`Tipo de receta: ${typeOfFood}`}</h4> : <h4>Tipo de receta: no especificado</h4> }
    {ingredients !== undefined ?   <h4>{`Ingredientes: ${ingredients}`}</h4> : <h4>Ingredientes: no especificados</h4> }
    
    {addDeleteFav === true 
    ? <button onClick={addRecipeFav}>Añadir a Favoritos</button> 
    : <button onClick={delRecipeFav}>Quitar de Favoritos</button> }
    <Link to={`/recipes/${recipeDetails._id}/edit`}><button>Editar</button></Link>
    <button onClick={handleDelete}>Borrar</button>

    

    </div>
    
    
    
    </div>
  )
}

export default RecipeDetails