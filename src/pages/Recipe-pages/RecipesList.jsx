
import React, { useContext }from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import RecipeAdd from '../../components/RecipeAdd'
import SearchRecipe from '../../components/SearchRecipe'
import { getRecipesListService } from '../../services/recipes.services'
import ClockLoader from "react-spinners/ClockLoader";

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
    setRecipeListToShow(filterArr)
  }

  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing)


  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100}/>
      </div> 
     )

  }


  return (
    <div>
      {isLoggedIn === true &&  
      <div class="btn bottom-padding">
        <button onClick={toggleForm} >Add recipe</button> 
        {formIsShowing === true 
          ? <RecipeAdd getData={getData} hideForm={setFormIsShowing} />
          : null }
      </div>
      }

    <div>
       <h1>¿Qué quieres cocinar hoy?</h1>
      <div class="recipeFormCard">
      <SearchRecipe filterList={filterList} /> 
    </div>
      <hr/>
      <div  class="recipeBoxCard">
      {recipeListToShow.map((eachRecipe) => {
        return (
          <div key={eachRecipe._id} class="shadow-lg p-3 mb-5 bg-body rounded recipeCard">
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