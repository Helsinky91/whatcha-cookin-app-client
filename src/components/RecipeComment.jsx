import React from 'react'
import { deleteCommentService } from '../services/comment.services'
import { useNavigate} from 'react-router-dom'


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
        <h3>{`${eachComment.username.username}`} dice "{`${eachComment.comment}`}"</h3>
       <button onClick={(event) => deleteComment(event, eachComment._id)}>Borrar comentario</button>
       </div>    
      )
    })
  )
  
}

export default RecipeComment