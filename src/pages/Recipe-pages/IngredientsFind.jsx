import React, { useEffect, useState } from 'react'
import { getRecipesListService, searchByIngredientService } from '../../services/recipes.services'
import { Link , useNavigate} from 'react-router-dom'
import SearchRecipe from '../../components/SearchRecipe'
// getRecipesListService
// searchByIngredientService
function IngredientsFind() {    

    const navigate = useNavigate();

    //states
    const [ ingredientList, setIngredientList ] = useState([]);
    const [ ingredientListToShow, setIngredientListToShow] = useState([])

    const [isFetching, setIsFetching] = useState(true)
    
    //calling the API
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        try {
        const response = await getRecipesListService()
        setIngredientList(response.data)
        console.log("response from ingr",  response.data)
        setIngredientListToShow(response.data)
        setIsFetching(false)

        }catch (error) {
        navigate("/error")
        }
    }
    
    //for the search button only by name
  const filterList = (filterQuery) => { 
        
     // const ingredients = searchByIngredientService()

    
    const filterArr = ingredientListToShow.filter((eachEl) => {
        console.log("eachEl.ingr" ,eachEl)
        console.log("filterQuery", filterQuery) //lega bien lo que se escribe en el input
        console.log("each ingredients",eachEl.ingredients )
      if (eachEl.ingredients?.indexOf(filterQuery) !== -1){
          return true
      } else {
          return false
      }
      
    })
    console.log("filterArr", filterArr)
    return setIngredientListToShow(filterArr)
  }



     //! change to loading SPINNER
    if (isFetching === true) {
    return <h3>...buscando</h3>
     }

  return (
    <div>
      <h1>¿Qué tienes en la nevera?</h1>
      <h3>Elije 1, 2 o 3 ingredientes y encuentra la receta perfecta</h3>
      <form>
        
      </form>




        <h1>Busca por ingrediente!</h1>
        <SearchRecipe filterList={filterList} />
        <br />
        <div>
      {ingredientListToShow.map((eachRecipe) => {
        return (
          <div key={eachRecipe._id}>
            <Link to={`/recipes/${eachRecipe._id}/details`}>
              <img src={eachRecipe.image} alt={eachRecipe.name} width={200} />
              <p>{eachRecipe.name}</p>
            </Link>
          </div>
      
        )
      })}

      </div>




    </div>
  )
}

export default IngredientsFind