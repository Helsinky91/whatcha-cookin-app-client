import React, { useContext }from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsAdmin from '../../components/IsAdmin';
import SearchFriend from '../../components/SearchFriend'
import { AuthContext } from "../../context/auth.context"
import { deleteProfileService, getProfilesListService } from "../../services/profile.services";
import ClockLoader from "react-spinners/ClockLoader";

function SearchFriends() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  //states
  const [friendList, setFriendList] = useState([]);
  const [friendListToShow, setFriendListToShow] = useState([]);

  //for loading time
  const [isFetching, setIsFetching] = useState(true);

  //calling the API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      //call all profile info 
      const response = await getProfilesListService();
      setFriendList(response.data);
      setFriendListToShow(response.data)
      setIsFetching(false);
      
    } catch (error) {
      navigate("/error");
    }
  };

  //for the search only by name
  const filterList = (filterQuery) => {
    const filterArr = friendList.filter((eachEl) => {
      return (eachEl.username.includes(filterQuery)
      || eachEl.username.toLowerCase().includes(filterQuery)) 
      || eachEl.username.includes(filterQuery.toLowerCase()) 
    });
    setFriendListToShow(filterArr);
  };

  const deleteUser = async (userId) => {
    try {
      //calling server that deletes profile
      await deleteProfileService(userId)     
      navigate("/profile/search-friends")
      getData()

     }catch(error) {
      navigate("/error")
     } 
  }

  //if content is not loading, show spinner
  if (isFetching === true) {
    return (
      <div className="spinner">
        <ClockLoader color="#d68736" size={100}/>
      </div> 
     )
  }

  return (
    <div>
      <div className="recipeFormCard">
        <div>
          <h1>¿A quién buscas?</h1>
          <SearchFriend filterList={filterList} />
          
          <div>
            {friendListToShow.map((eachFriend) => {
              return (
                <div key={eachFriend._id} class="recipeBoxCard">
                {eachFriend._id !== user._id 
                  ?  (
                  <div> <Link to={`/profile/${eachFriend._id}/details`}>
                    <img src={eachFriend.image} alt={eachFriend.username} width={200}/>
                    <p>{eachFriend.username}</p> 
                    </Link>
                    <IsAdmin><button className="btndelete" onClick={() => deleteUser(eachFriend._id)} >Borrar useario</button></IsAdmin> 
                  </div> )
                  : <></> }
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchFriends;