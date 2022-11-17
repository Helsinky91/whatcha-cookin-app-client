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
  const { isLoggedIn, user } = useContext(AuthContext)


  //states
  const [friendList, setFriendList] = useState([]);
  const [friendListToShow, setFriendListToShow] = useState([]);
  const [formIsShowing, setFormIsShowing] = useState(false);

  //for loading time
  const [isFetching, setIsFetching] = useState(true);

  //calling the API
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
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
      return eachEl.username.includes(filterQuery);
    });
    setFriendListToShow(filterArr);
  };

  // //to hide the form unless pressing the button
  // const toggleForm = () => setFormIsShowing(!formIsShowing);
  
  const deleteUser = async (userId) => {
    try {
      await deleteProfileService(userId) 
      
      navigate("/profile/search-friends")
      getData()
     }catch(error) {
      navigate("/error")
     } 
       
  }

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