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
const editRecipeService = (id) => {
    return service.patch(`/recipes/${id}/edit`)
}

//creates new recipe
const createRecipeService = (newRecipe) => {
    return service.post("recipes/create", newRecipe)
}

//delete a recipe
const deleteRecipeService = (id) => {
    return service.delete(`/recipes/${id}/edit`)
}

//add a recipe to favourites
const favRecipeService = (id) => {
    return service.patch(`/recipes/${id}/fav-recipe`)
}

//remove recipe from favourites
const deleteFavRecipeService = (id) => {
    return service.get(`/recipe/${id}/delete-fav`)
}

//! BONUS PATCH "/api/recipes/:recipeId/likes"


export {
    getRecipesListService,
    randomRecipeService,
    recipeDetailsService,
    editRecipeService,
    createRecipeService,
    deleteRecipeService,
    favRecipeService,
    deleteFavRecipeService

}