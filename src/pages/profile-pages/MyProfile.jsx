import React from 'react'
import { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {  getMyProfileService } from '../../services/profile.services'
import { deleteFavRecipeService, favRecipeService } from '../../services/recipes.services';


function Profile() {
  
//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//unFriend, addFriend 
  
  const navigate = useNavigate();

  //states
  const [profileList, setProfileList] = useState([])

  //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
     const response = await getMyProfileService()

     setProfileList(response.data)
     setIsFetching(false)

    }catch (error) {
      navigate("/error")
    }
  }

  const favRecipe = async (recipeId) => {
    
    try {
      const response = await getMyProfileService()
     //!CREAR EN EL BACK END RUTA POPULATE + SERVICIO 
      
    } catch (error) {
      navigate("/error")
    }
     // crida al UserID con getMyProfileSevices
     // populate de favorires
     // qué nos da response.data
     // .map 

    //deleteFavRecipeService(recipeId)
  }
  



  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }



  return (
    <div>
         
          <div>
            <h1>Hola {profileList.username}! </h1>
            <img src={profileList.photo} alt={profileList.username} />
          </div>
          
          <div>
            <Link to={`/profile/${profileList._id}/edit`}>
              <button>Edit your profile</button>
            </Link>

          </div>
          


        <div className="dashboard">
            <div>
              <p>Tus amigos</p>

            </div>
            <div>
              <p>Tus recetas creadas</p>

            </div>

              <p>Tus recetas favoritas</p>

        </div>
    </div>
  )
}

export default Profile