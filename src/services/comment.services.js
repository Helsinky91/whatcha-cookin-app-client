import service from "./config.services";


// create a new comment
const createCommentService = (recipeId, comment) => {
    return service.post(`/comment/${recipeId}/create`, comment)
}

//get the list of comments of one recipe
const getCommentService = (recipeId) => {
    return service.get(`/comment/${recipeId}/comment-list`)
}

//delete a comment
const deleteCommentService = (commentId) => {
    return service.delete(`/comment/${commentId}/delete`)
}


export {
    createCommentService,
    getCommentService,
    deleteCommentService
}