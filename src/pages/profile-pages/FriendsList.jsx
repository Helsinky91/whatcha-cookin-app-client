import React, { useContext }from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsAdmin from '../../components/IsAdmin';
import SearchFriend from '../../components/SearchFriend'
import { AuthContext } from "../../context/auth.context"
import { deleteProfileService, getProfilesListService } from "../../services/profile.services";

function SearchFriends() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext)


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

  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing);
  
  const deleteUser = async (userId) => {
    try {
      await deleteProfileService(userId) 
      
      navigate("/profile/search-friends")
      getData()
     }catch(error) {
      navigate("/error")
     } 
       
  }

  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
    
      <div>
        <h1>Posibles amigos</h1>

        <SearchFriend filterList={filterList} />

        <br />
        <div>
          {friendListToShow.map((eachFriend) => {
            return (
              <div key={eachFriend._id}>
                <Link to={`/profile/${eachFriend._id}/details`}>
                  <img
                    src={eachFriend.image}
                    alt={eachFriend.username}
                    width={200}
                  />
                  <p>{eachFriend.username}</p>
                </Link>
                <IsAdmin><button className="delete-btn" onClick={() => deleteUser(eachFriend._id)} >Delete User</button></IsAdmin>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchFriends;