import service from "./config.services";

//get the list of recipes
const getRecipesList = () => {
    return service.get("/recipes/recipes-list")
}

//get the random recipe
const randomRecipe = () => {
    return service.get("/recipes/random-recipe")
}

//gets recipe detailed 
const recipeDetails = (id) => {
    return service.get(`/recipe/${id}/details`)
}

//edit a recipe
const editRecipe = (id) => {
    return service.patch(`/recipe/${id}/edit`)
}

//creates new recipe
const createRecipe = () => {
    return service.post("recipes/create")
}

//delete a recipe
const deleteRecipe = (id) => {
    return service.delete(`/recipe/${id}/edit`)
}

//add a recipe to favourites
const favRecipe = (id) => {
    return service.patch(`/recipe/${id}/fav-recipe`)
}

//remove recipe from favourites
const deleteFavRecipe = (id) => {
    return service.get(`/recipe/${id}/delete-fav`)
}

//! BONUS PATCH "/api/recipes/:recipeId/likes"


export {
    getRecipesList,
    randomRecipe,
    recipeDetails,
    editRecipe,
    createRecipe,
    deleteRecipe,
    favRecipe,
    deleteFavRecipe

}