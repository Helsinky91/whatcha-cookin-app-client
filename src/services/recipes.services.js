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


//send information of utils "tags" from BE
const tagInfoService = () => {
    return service.get("/recipes/tag")
}

//select ingredient for all recipes
const searchByIngredientService = () => {
    return service.get("/recipes/ingredients-list")
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
    deleteFavRecipeService,
    tagInfoService,
    searchByIngredientService

}