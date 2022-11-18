import React, { useContext } from 'react'
import { deleteCommentService } from '../services/comment.services'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"


function RecipeComment(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  const { recipeComments, updateComments } = props
  const deleteComment = async (event, commentId) => {
    event.preventDefault()
    try {

      await deleteCommentService(commentId)
      updateComments()
    } catch (error) {
      navigate("/error")


    }
  }
  console.log("recipeComments", recipeComments)

  return (
    recipeComments.map((eachComment) => {
      return (
        <div className="comment-display">

          {user._id === eachComment.username._id
            ? <h5><Link to={"/profile/my-profile"}><b>{`${eachComment.username.username}`}</b></Link><b> dice </b> "{`${eachComment.comment}`}"</h5>
            : <h5><Link to={`/profile/${eachComment.username._id}/details`}> <b>{`${eachComment.username.username}`}</b></Link><b> dice </b> "{`${eachComment.comment}`}"</h5>
          }

          {user._id === eachComment.username._id || user.role === "admin"
            ? <button onClick={(event) => deleteComment(event, eachComment._id)}>Borrar comentario</button>
            : null}

        </div>
      )
    })
  )

}

export default RecipeComment