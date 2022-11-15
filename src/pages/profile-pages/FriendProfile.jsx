import React, { useState, useEffect } from 'react'
import { getProfileService } from '../../services/profile.services'
import { useNavigate, useParams } from 'react-router-dom'



function FriendProfile() {


  const navigate = useNavigate();
  const {userId} = useParams()
 

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



    </div>
  )
}

export default FriendProfile