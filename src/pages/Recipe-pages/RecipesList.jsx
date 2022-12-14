
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import RecipeAdd from '../../components/RecipeAdd';
import SearchRecipe from '../../components/SearchRecipe';
import { getRecipesListService } from '../../services/recipes.services';
import ClockLoader from "react-spinners/ClockLoader";

function RecipesList() {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  //states
  const [recipeList, setRecipeList] = useState([]);
  const [recipeListToShow, setRecipeListToShow] = useState([]);
  const [formIsShowing, setFormIsShowing] = useState(false);

  //for loading time
  const [isFetching, setIsFetching] = useState(true);

  //calling the API
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    try {
      //calling service that gets all recipes from BE
      const response = await getRecipesListService();
      setRecipeList(response.data);
      setRecipeListToShow(response.data);
      setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }

  //for the search button only by name, not case sensitive
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

  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100} />
      </div>
    )
  }

  return (
    <div>
      {isLoggedIn === true &&
        <div class="btn bottom-padding">
          {formIsShowing === false
            ? <button onClick={toggleForm} >A??adir receta nueva</button>
            : <RecipeAdd getData={getData} hideForm={toggleForm} />
          }
        </div>
      }

      <div>
        <h1>??Qu?? quieres cocinar hoy?</h1>
        <div class="recipeFormCard">
          <SearchRecipe filterList={filterList} />
        </div>

        <hr className='hr-recipe' />
        
        <div class="recipeBoxCard">
          {recipeListToShow.map((eachRecipe) => {
            return (
              <div key={eachRecipe._id} class="shadow-lg p-3 mb-5 bg-body rounded recipeCard">
                {!isLoggedIn
                  ? <div>
                    <Link to={`/login`}>
                      <img src={eachRecipe.image} alt={eachRecipe.name} width={200} />
                      <p>{eachRecipe.name}</p></Link>
                  </div>
                  : <Link to={`/recipes/${eachRecipe._id}/details`}>
                    <img src={eachRecipe.image} alt={eachRecipe.name} width={200} />
                    <p>{eachRecipe.name}</p>
                  </Link>
                }
              </div>
            )
          })}

        </div>

      </div>
    </div>

  )
}

export default RecipesList