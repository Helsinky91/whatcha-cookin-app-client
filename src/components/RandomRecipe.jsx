import React , { useEffect, useState }from 'react'
import { randomRecipeService } from '../services/recipes.services'

function RandomRecipe() {

  const [ randomRecipe, setRandomRecipe] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      await randomRecipeService()
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div>RandomRecipe</div>
  )
}

export default RandomRecipe