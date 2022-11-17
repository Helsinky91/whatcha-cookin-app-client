import React, { useEffect, useState } from "react";
import {
  getRecipesListService,
  searchByIngredientService,
} from "../../services/recipes.services";
import { Link, useNavigate } from "react-router-dom";
import SearchIngredient from "../../components/SearchIngredient";
import SearchIngredientTwo from "../../components/SearchIngredientTwo";
import SearchIngredientThree from "../../components/SearchIngredientThree";
import ClockLoader from "react-spinners/ClockLoader";

// getRecipesListService
// searchByIngredientService
function IngredientsFind() {
  const navigate = useNavigate();

  //states
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientListToShow, setIngredientListToShow] = useState([]);
      const [ ingredientListToShowTwo, setIngredientListToShowTwo] = useState([])
      const [ ingredientListToShowThree, setIngredientListToShowThree] = useState([])
      const [ ingredientSearch, setIngredientSearch] = useState([])


  const [isFetching, setIsFetching] = useState(true);

  //calling the API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getRecipesListService();
      setIngredientList(response.data);
      setIngredientSearch(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  //for the search button only by name
  const filterList = (filterQuery) => {
    const filterArr = ingredientList.filter((eachEl) => {
     return (eachEl.ingredients.includes(filterQuery) 
     || eachEl.ingredients.toLowerCase().includes(filterQuery)) 
     || eachEl.ingredients.includes(filterQuery.toLowerCase()) 
   })


    return (setIngredientListToShow(filterArr), setIngredientSearch(filterArr))
  };
  const filterListTwo = (filterQuery) => {
    const filterArr = ingredientListToShow.filter((eachEl) => {
     return (eachEl.ingredients.includes(filterQuery) 
     || eachEl.ingredients.toLowerCase().includes(filterQuery)) 
     || eachEl.ingredients.includes(filterQuery.toLowerCase()) 
   })

    return (setIngredientListToShowTwo(filterArr), setIngredientSearch(filterArr) );
  };

  const filterListThree = (filterQuery) => {
    const filterArr = ingredientListToShowTwo.filter((eachEl) => {
     return (eachEl.ingredients.includes(filterQuery) 
     || eachEl.ingredients.toLowerCase().includes(filterQuery)) 
     || eachEl.ingredients.includes(filterQuery.toLowerCase()) 
   })

    return (setIngredientListToShowThree(filterArr), setIngredientSearch(filterArr) );
  };




  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100}/>
      </div> 
     )

  }

  return (
    <div>
      <h1>¿Qué tienes en la nevera?</h1>
      <h3>Elije 1, 2 o 3 ingredientes y encuentra la receta perfecta</h3>
      <form></form>

      <h1>Busca por ingrediente!</h1>
      <SearchIngredient filterList={filterList} />
      <SearchIngredientTwo filterList={filterListTwo} />
      <SearchIngredientThree filterList={filterListThree} />

      <br />
      <div>
        {ingredientSearch.map((eachRecipe) => {
          return (
            <div key={eachRecipe._id}>
              <Link to={`/recipes/${eachRecipe._id}/details`}>
                <img src={eachRecipe.image} alt={eachRecipe.name} width={200} />
                <p>{eachRecipe.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IngredientsFind;
