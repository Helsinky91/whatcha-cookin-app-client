import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IsAdmin from '../../components/IsAdmin';
import { getMyFavRecipesService, getMyProfileService, myCreatedRecipesService, myFriendsService } from '../../services/profile.services'
import ClockLoader from "react-spinners/ClockLoader";


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
      //call my profile info 
      const response = await getMyProfileService()
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

    } catch (error) {
      navigate("/error")
    }
  }

  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100} />
      </div>
    )
  }


  return (
    <div>

      <div className="bottom-padding" >
        <div className="one-row">
          <h1>Hola {profileList.username}! </h1>

          <div className='btn'>
            <Link to={`/profile/${profileList._id}/edit`}>
              <button>Edit your profile</button>
            </Link>
          </div>
        </div>


        <div className="my-profile" >
          <div>
            <img src={profileList.image} alt={profileList.username} width={150} />
          </div>
          <div className="left-margin">
            <h3>Sobre m??: </h3>
            <p>{profileList.description}</p>
            {profileList.tag !== undefined ? <p><b>Me interesa: </b>{`${profileList.tag}`} </p> : <p>Intereses no especificados</p>}
          </div>
        </div>
      </div>

      <hr className='hr-profile' />

      <div className='dashboard'>
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

        <div>
          <h3>Tus amigos</h3>
          {myFriends !== null
            && myFriends.friends.map((eachFriend, index) => {
              return (
                <div key={index} >
                  {eachFriend !== undefined
                    && (<div className="dashboard-profile-friends">
                      <Link to={`/profile/${eachFriend._id}/details`}><p>
                        <img src={eachFriend.image} alt={eachFriend.name} width={45} />{eachFriend.username}</p></Link>
                    </div>)}
                </div>
              )
            })}
        </div>

        <div>
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
    </div>
  )
}

export default Profile