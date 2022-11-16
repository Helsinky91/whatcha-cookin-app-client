import React , { useEffect, useState }from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { randomRecipeService } from '../services/recipes.services'

function RandomRecipe() {

  const navigate = useNavigate()

  const [ randomRecipe, setRandomRecipe] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await randomRecipeService()
      setRandomRecipe(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }
  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }


  return (
    <div>
    {!randomRecipe._id ? (
    <div className='home-btn'>

      <h2>Mira esta receta:</h2>
      <p>Vaya! Parece que no hay ninguna receta creada ahora mismo!</p>
      <p>Añade una nueva <Link to={"/recipes-list"}>aquí</Link></p>
      
    </div>
      ) :  (
    <div className='home-btn'>

      <h2>Mira esta receta:</h2>
      <Link to={`/recipes/${randomRecipe._id}/details`}>
      <img src={randomRecipe.image} alt={randomRecipe.name} width={200}/>
      <p>{randomRecipe.name}</p>
      <p>{randomRecipe.description} </p>
      </Link>
      
    </div>
      )}
    </div>
  )
}

export default RandomRecipe