import React, { useState, useEffect } from 'react'
import { addFriendService, getProfileService, unFriendService } from '../../services/profile.services'
import { useNavigate, useParams } from 'react-router-dom'



function FriendProfile() {


  const navigate = useNavigate();
  const { userId } = useParams()
 

    //states
  const [friendProfileList, setFriendProfileList] = useState([])

    //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
  getData()
  }, [])

const getData = async () => {

  try {
   const response = await getProfileService(userId)
   console.log("favourites",response.data)
   setFriendProfileList(response.data)
   setIsFetching(false)

  }catch (error) {
    navigate("/error")
  }
}



const addFriendFav = async () => {
  try {

    console.log(userId)
    await addFriendService(userId)
  } catch (error) {
    console.log(error)
  }
}


const delFriendFav = async () => {
  try {
    await unFriendService(userId)

  } catch (error) {
    console.log(error)
  }
}



  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }

  const { username, image, description } = friendProfileList

  return (
    <div>
      <div>
        <h1>Bienvenido al perfil de {username}</h1>
        <img src={image} alt={username} />
      </div>
      <div>
        <h4>Descripción: {description}</h4>
      </div>


      <button onClick={addFriendFav}>Añadir a Favoritos</button> 
  
       <button onClick={delFriendFav}>Quitar de Favoritos</button> 


    </div>
  )
}

export default FriendProfile