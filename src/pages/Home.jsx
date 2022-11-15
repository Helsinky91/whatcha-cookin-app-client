import React from 'react'
import { Link } from 'react-router-dom'
import RandomRecipe from '../components/RandomRecipe'


function Home() {

  



  return (
    <div>
    <div>

      <h1>Whatcha cookin'</h1>
    </div>
    <div className="home-dashboard">
      <div>
        <RandomRecipe/>

      </div>
      <div>
      <h2>Sharing is caring!</h2>
      <p>Tienes 5 libros de recetas y millones de papeles con las recetas de tu abuela, tu vecina, tu cuñado, etc?
      <br /> 
      Pierdes siempre un montón de tiempo para encontrarlas?
      <br />
      <br />
      Con Whatcha cookin' las tendrás todas en la palma de tu mano, fáciles de editar, fáciles de encontrar y lo mejor: fáciles de compartir!
      <br />
      <br />
      No hará falta que te crees una cuenta si lo que quieres es buscar recetas, pero si quieres añadir, guardar en favoritas y comentar las recetas que encuentres, 
      puedes hacer <Link to={"/signup"}>Sing up</Link> y create una cuenta! 
      </p>
      </div>
      <div>
        <h2>Buscadores</h2>
        <ul className='home-btn'>
       
        <li> <Link to={"/recipes-list"} ><button> Busca una receta </button> </Link> </li>
        <li> <Link to={"/recipes-list"} ><button>Encuentra tu amigo </button> </Link>  </li>

      
      </ul> 
      </div> 
      </div>
    </div>
  )
}

export default Home