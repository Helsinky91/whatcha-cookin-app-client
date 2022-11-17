
import React, { useContext }from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import RecipeAdd from '../../components/RecipeAdd'
import SearchRecipe from '../../components/SearchRecipe'
import { getRecipesListService } from '../../services/recipes.services'


function RecipesList() {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext)

  //states
  const [recipeList, setRecipeList] = useState([])
  const [recipeListToShow, setRecipeListToShow] = useState([])
  const [formIsShowing, setFormIsShowing] = useState(false)

  //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
     const response = await getRecipesListService()
     setRecipeList(response.data)
     setRecipeListToShow(response.data)
     setIsFetching(false)

    }catch (error) {
      navigate("/error")
    }
  }
  

  //for the search button only by name
  const filterList = (filterQuery) => { 
        
    const filterArr = recipeList.filter((eachEl) => {
      return (eachEl.name.includes(filterQuery) 
      || eachEl.name.toLowerCase().includes(filterQuery)) 
      || eachEl.name.includes(filterQuery.toLowerCase()) 
    })
    console.log(filterArr)
    setRecipeListToShow(filterArr)
  }

  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing)

  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }


  return (
    <div>
      {/* only to show if you are logged in  */}
      {isLoggedIn === true &&  
      <div>
        <button onClick={toggleForm}>Add recipe</button> 
        {formIsShowing === true 
          ? <RecipeAdd getData={getData} hideForm={setFormIsShowing} />
          : null }
      </div>
      }

    <div>
       <h1>¿Qué quieres cocinar hoy?</h1>
    
      <SearchRecipe filterList={filterList} /> 
    
      <br/>
      <div>
      {recipeListToShow.map((eachRecipe) => {
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
     </div>
  
)}

export default RecipesList