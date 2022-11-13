import service from "./config.services";

//get the list of ingredients
const getIngredientListService = () => {
    return service.get("/ingredient/list")
}

//edit ingredient
const updateIngredientService = (id) => {
    return service.patch(`/profile/${id}/edit`)
}

//!notsure
//POST "/api/ingredient/create"
const createIngredientService = (newIngredient) => {
    return service.post("/ingredient/create", newIngredient)
}

// DELETE "/api/ingredient/:ingredientId/delete"
const deleteIngredientService = (id) => {
    return service.get(`/profile/${id}/delete`)
}


export {
    getIngredientListService,
    updateIngredientService,
    createIngredientService,
    deleteIngredientService

}