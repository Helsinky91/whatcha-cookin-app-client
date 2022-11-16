import service from "./config.services";


// create a new comment
const createCommentService = (recipeId) => {
    return service.post(`/comment/${recipeId}/create`)
}

//get the list of comments of one recipe
const getCommentService = (recipeId) => {
    return service.get(`/comment/${recipeId}/comment-list`)
}



export {
    createCommentService,
    getCommentService
}