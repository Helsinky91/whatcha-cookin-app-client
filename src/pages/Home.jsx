import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RandomRecipe from '../components/RandomRecipe'


function Home() {

  const [ randomIsShowing, setRandomIsShowing ] = useState(true)
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
    <div>

      <h1>Whatcha cookin'</h1>
    </div>
    <div className="home-dashboard home-btn">
      <div>
      {randomIsShowing === true 
      ? <div> 
        <RandomRecipe /> 
        <button  onClick={refresh}>Mira otra receta</button>
        </div>
      : <div>
        <h2>Preparándote otra receta</h2>
        {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.greenpan.es%2Fcolecciones%2Fbarcelona%2Fsart%25C3%25A9n-para-pescado-antiadherente-barcelona%2FCW002277-002.html&psig=AOvVaw0Q3jk_pNNoh8cDnw7bFfRa&ust=1668782708383000&source=images&cd=vfe&ved=2ahUKEwi3-8uVurX7AhUEgc4BHb7qBXsQjRx6BAgAEAo" alt="" /> */}
        </div>
        
      }

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
        <div  className='home-btn'>
          <Link to={"/recipes-list"}><button>Busca una receta</button></Link>
          <br />
          <Link to={"/profile/search-friends"}><button>Encuentra tu amigo</button></Link> 
          <br />
          <Link to={"/recipes/ingredients-find"} ><button>Qué tienes en tu nevera</button> </Link> 
        </div>
        
      </div> 
      </div>
    </div>
  )
}

export default Home