import service from "./config.services";

//get the list of recipes
const getRecipesListService = () => {
    return service.get("/recipes/recipes-list")
}

//get the random recipe
const randomRecipeService = () => {
    return service.get("/recipes/random-recipe")
}

//gets recipe detailed 
const recipeDetailsService = (id) => {
    return service.get(`/recipes/${id}/details`)
}

//edit a recipe
const editRecipeService = (recipeId, editRecipe) => {
    return service.patch(`/recipes/${recipeId}/edit`, editRecipe)
}

//creates new recipe
const createRecipeService = (newRecipe) => {
    return service.post("recipes/create", newRecipe)
}

//delete a recipe
const deleteRecipeService = (recipeId) => {
    return service.delete(`/recipes/${recipeId}/delete`)
}

//add a recipe to favourites
const favRecipeService = (recipeId) => {
    return service.patch(`/recipes/${recipeId}/fav-recipe`)
}

//remove recipe from favourites
const deleteFavRecipeService = (recipeId) => {
    return service.patch(`/recipes/${recipeId}/delete-fav`)
}

//return user favourites recipes
// const userFavRecipeService = (recipeId) => {
//     return service.get(`/recipes/${recipeId}/user-fav-recipes`)
// }


//! BONUS PATCH "/api/recipes/:recipeId/likes"


export {
    getRecipesListService,
    randomRecipeService,
    recipeDetailsService,
    editRecipeService,
    createRecipeService,
    deleteRecipeService,
    favRecipeService,
    deleteFavRecipeService,
    // userFavRecipeService

}