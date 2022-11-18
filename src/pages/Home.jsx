import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RandomRecipe from '../components/RandomRecipe'
import ClockLoader from "react-spinners/ClockLoader";


function Home() {

  const [randomIsShowing, setRandomIsShowing] = useState(true)
  const refresh = () => {
    if (randomIsShowing === true) {
      setRandomIsShowing(!randomIsShowing)
    }
    setTimeout(() => {

      setRandomIsShowing(true)
    }, 2000);

  }

  return (
    <div>
      <div className='app-title'>
        <h1>Whatcha cookin'</h1>
      </div>

      <div className="dashboard btn">
        <div>
          {randomIsShowing === true
            ? <div>
              <RandomRecipe />
              <button onClick={refresh}>Mira otra receta</button>
            </div>
            : <div>
              <h1>Preparándote otra receta</h1>
              <div className='spinner-random-recipe'>
                <ClockLoader color="#d68736" size={80} />
              </div>

            </div>

          }

        </div>
        <div className="main-text">
          <h1>Sharing is caring!</h1>
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
          <h1>Buscadores</h1>
          <div className='btn'>
            <Link to={"/recipes-list"}><button>Busca una receta</button></Link>
            <br />
            <Link to={"/profile/search-friends"}><button>Encuentra tu amigo</button></Link>
            <br />
            <Link to={"/recipes/ingredients-find"} ><button>¿Qué tienes en tu nevera?</button> </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home