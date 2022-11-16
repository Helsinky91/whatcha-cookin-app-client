import React from 'react'
import { deleteCommentService } from '../services/comment.services'
import { Link, useNavigate} from 'react-router-dom'


function RecipeComment(props) {
  const navigate = useNavigate();

  const { recipeComments, updateComments } = props
const deleteComment = async(event, commentId) => {
  event.preventDefault()
  try {
 
    await deleteCommentService(commentId)
    console.log("borrando")
    updateComments()
  } catch (error) {
      console.log(error)
    
  } 
}
  
  return ( 
    recipeComments.map((eachComment) => {
      return (
        <div>
        <h3><Link to={`/profile/${eachComment.username._id}/details`}>{`${eachComment.username.username}`}</Link> dice "{`${eachComment.comment}`}"</h3>
        {console.log("eachComment._id", eachComment._id)}{console.log("eachComment.username._id", eachComment.username._id)}
       {eachComment._id === eachComment.username._id && <button onClick={(event) => deleteComment(event, eachComment._id)}>Borrar comentario</button>}
       </div>    
      )
    })
  )
  
}

export default RecipeComment