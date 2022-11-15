import React from 'react'
import { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {  favouriteUserRecipesService, getMyProfileService, myCreatedRecipesService, myFriendsService } from '../../services/profile.services'


function Profile() {
  
//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//unFriend, addFriend 
  
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
     console.log(response.data)
     setProfileList(response.data)
     //call my recipes
     const response2 = await myCreatedRecipesService()
     setMyRecipes(response2.data)
     //call my favourite recipes
     const response3 = await favouriteUserRecipesService()
     setMyFavRecipes(response3.data)
     //call my friends list
    //  const response4 = await myFriendsService(response.data._id)
    //  setMyFriends(response4.data)
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
            <img src={profileList.image} alt={profileList.username} />
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
              {myRecipes.map((eachRecipe) => {
                return (
                  <p>{eachRecipe.name}</p>
                  )
              })}
            </div>
              <h3>Tus amigos</h3>
              {myFriends !== null
              && myFriends.map((eachFriend) => {
                return (
                  <p>{eachFriend.username}</p>
                )
              })}
            </div>

              <h3>Tus recetas favoritas</h3>
              {myFavRecipes !== null
              && myFavRecipes.map((eachFavRecipe) => {
                return (
                  <p>{eachFavRecipe.name}</p>
                )
              })}
        </div>
    </div>
  )
}

export default Profile