import React from 'react'
import { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import IsAdmin from '../../components/IsAdmin';
import {  getMyFavRecipesService, getMyProfileService, myCreatedRecipesService, myFriendsService } from '../../services/profile.services'


function Profile() {
  
  
  const navigate = useNavigate();

  //states
  
  const [profileList, setProfileList] = useState([])
  const [myRecipes, setMyRecipes] = useState([])
  const [myFavRecipes, setMyFavRecipes] = useState([])
  const [myFriends, setMyFriends] = useState([])

  //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
     const response = await getMyProfileService()
     //call my profile info
     setProfileList(response.data)
     //call my recipes
     const response2 = await myCreatedRecipesService()
     setMyRecipes(response2.data)

     //call my favourite recipes
     const response3 = await getMyFavRecipesService()
     setMyFavRecipes(response3.data)
     

     //call my friends list
     const response4 = await myFriendsService()
     setMyFriends(response4.data)
     setIsFetching(false)
    }catch (error) {
      navigate("/error")
    }
  }
  
  
  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }


  return (
    <div>
         
          <div>
            <h1>Hola {profileList.username}! </h1>
            <img src={profileList.image} alt={profileList.username} width={150}/>
            {profileList.tag !== undefined ? <p><b>Me interesa: </b>{`${profileList.tag}`} </p> : <p>Intereses no especificados</p> }
            <h3>Sobre mí: </h3>
            <p>{profileList.description}</p>
          </div>
         
          <div>
            <Link to={`/profile/${profileList._id}/edit`}>
              <button>Edit your profile</button>
            </Link>
          </div>
          
        <div>
            <div>
            <div>
              <h3>Tus recetas creadas</h3>
              {myRecipes !== null
              && myRecipes.map((eachRecipe, index) => {
                return (
                  <div key={index}>
                  <Link to={`/recipes/${eachRecipe._id}/details`}><p>{eachRecipe.name}</p></Link>
                  </div>
                  )
              })}
            </div>
              <h3>Tus amigos</h3>
              {myFriends !== null
              && myFriends.friends.map((eachFriend, index) => {
                return (
                  <div key={index}>
                 <Link to={`/profile/${eachFriend._id}/details`}><p>{eachFriend.username}</p></Link> 
                 </div>
                )
              })}
            </div>

              <h3>Tus recetas favoritas</h3>
              {myFavRecipes !== null
              && myFavRecipes.favourites.map((eachFavRecipe, index) => {
                return (
                  <div key={index}>
                  <Link to={`/recipes/${eachFavRecipe._id}/details`}><p>{eachFavRecipe.name}</p></Link>
                  </div>
                )
              })}
        </div>
    </div>
  )
}

export default Profile