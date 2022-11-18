import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notFound-page">
      <h1>Vaya, parece que estás saliendo de la cocina.</h1>
      <Link to={"/"}>Vuelve a entrar</Link>
    </div>
  )
}

export default NotFound