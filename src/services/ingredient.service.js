import service from "./config.services";

//get the list of ingredients
const getIngredientList = () => {
    return service.get("/ingredient/list")
}

//edit ingredient
const updateIngredient = (id) => {
    return service.patch(`/profile/${id}/edit`)
}

//!notsure
//POST "/api/ingredient/create"
const createIngredient = (newIngredient) => {
    return service.post("/ingredient/create", newIngredient)
}

// DELETE "/api/ingredient/:ingredientId/delete"
const deleteIngredient = (id) => {
    return service.get(`/profile/${id}/delete`)
}


export {
    getIngredientList,
    updateIngredient,
    createIngredient,
    deleteIngredient

}