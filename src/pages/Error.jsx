import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="error-page">
      <h1 >Nuestros desarrolladores cometieron un error, estamos trabjando en ello!</h1>
      <Link to={"/"}>Vuelve a entrar</Link>
    </div>
  )
}

export default Error