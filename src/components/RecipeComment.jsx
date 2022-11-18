import React, { useContext } from 'react'
import { deleteCommentService } from '../services/comment.services'
import { Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/auth.context"


function RecipeComment(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  
  const { recipeComments, updateComments } = props
const deleteComment = async(event, commentId) => {
  event.preventDefault()
  try {
 
    await deleteCommentService(commentId)
    updateComments()
  } catch (error) {
    navigate("/error")

    
  } 
}
  
  return ( 
    recipeComments.map((eachComment) => {
      return (
        <div>
        <h3><Link to={`/profile/${eachComment.username._id}/details`}>{`${eachComment.username.username}`}</Link> dice "{`${eachComment.comment}`}"</h3>
       {user._id === eachComment.username._id || user.role === "admin"
       ? <button onClick={(event) => deleteComment(event, eachComment._id)}>Borrar comentario</button>
       : null }
      
       </div>
      )
    })
  )
  
}

export default RecipeComment