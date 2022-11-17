import React, { useEffect, useState } from "react";
import {
  getRecipesListService,
  searchByIngredientService,
} from "../../services/recipes.services";
import { Link, useNavigate } from "react-router-dom";
import SearchIngredient from "../../components/SearchIngredient";
import SearchIngredientTwo from "../../components/SearchIngredientTwo";
import SearchIngredientThree from "../../components/SearchIngredientThree";
// getRecipesListService
// searchByIngredientService
function IngredientsFind() {
  const navigate = useNavigate();

  //states
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientListToShow, setIngredientListToShow] = useState([]);
      const [ ingredientListToShowTwo, setIngredientListToShowTwo] = useState([])
      const [ ingredientListToShowThree, setIngredientListToShowThree] = useState([])

  const [isFetching, setIsFetching] = useState(true);

  //calling the API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getRecipesListService();
      setIngredientList(response.data);
      console.log("response from ingr", response.data);
      setIngredientListToShow(response.data);
         setIngredientListToShowTwo(response.data)
         setIngredientListToShowThree(response.data)
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //for the search button only by name
  const filterList = (filterQuery) => {
    const filterArr = ingredientListToShowTwo.filter((eachEl) => {
      if (eachEl.ingredients?.indexOf(filterQuery) !== -1) {
        return true;
      } else {
        return false;
      }
    });

    return setIngredientListToShow(filterArr);
  };

  return (
    <div>
      <h1>¿Qué tienes en la nevera?</h1>
      <h3>Elije 1, 2 o 3 ingredientes y encuentra la receta perfecta</h3>
      <form></form>

      <h1>Busca por ingrediente!</h1>
      <SearchIngredient filterList={filterList} />
      <SearchIngredientTwo filterList={filterList} />
      <SearchIngredientThree filterList={filterList} />

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
          );
        })}
      </div>
    </div>
  );
}

export default IngredientsFind;
