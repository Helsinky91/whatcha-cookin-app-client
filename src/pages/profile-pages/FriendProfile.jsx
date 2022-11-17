import React, { useState, useEffect } from 'react'
import { addFriendService, getFriendFavRecipes, getProfileService, unFriendService } from '../../services/profile.services'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader";



function FriendProfile() {


  const navigate = useNavigate();
  const { userId } = useParams()
 

    //states
  const [friendProfileList, setFriendProfileList] = useState([])
  const [friendFavRecipes, setFriendFavRecipes] = useState([])

    //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
  getData()
  }, [])

const getData = async () => {

  try {
    const response = await getProfileService(userId)
    setFriendProfileList(response.data)
    const response2 = await getFriendFavRecipes(userId)
    setFriendFavRecipes(response2.data.favourites)
   setIsFetching(false)
  }catch (error) {
    navigate("/error")
  }
}



const addFriendFav = async () => {
  try {


    await addFriendService(userId)
  } catch (error) {
    navigate("/error")

  }
}


const delFriendFav = async () => {
  try {
    await unFriendService(userId)

  } catch (error) {
    navigate("/error")

  }
}



  if (isFetching === true) {
    return (
      <div className="App">
        <ClockLoader color="#d68736" size={100}/>
      </div> 
     )

  }

  const { username, image, description, tag } = friendProfileList

  return (
    <div>
      <div>
        <h1>Bienvenido al perfil de {username}</h1>
        <img src={image} alt={username} width={200}/>
      </div>
      <button onClick={addFriendFav}>Añadir a Mis Amigos</button> 
  
       <button onClick={delFriendFav}>Quitar de Mis Amigos</button> 
      <div>
        <h4>Descripción: <span>{description}</span></h4>
        {tag !== undefined ? <h4><b>Me interesa: </b>{`${tag}`} </h4> : <p>Intereses no especificados</p> }

        <h4>Mis platos preferidos</h4>
        {friendFavRecipes.map((eachFav) => {
          return (
            <div key={eachFav._id}>
            <Link to={`/recipes/${eachFav._id}/details`}>
                  <img
                    src={eachFav.image}
                    alt={eachFav.name}
                    width={200}
                  />
                  <p>{eachFav.name}</p>
                </Link>
              </div>
          )
          
        })}
      </div>



    </div>
  )
}

export default FriendProfile