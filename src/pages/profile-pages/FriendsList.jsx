import React, { useContext }from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FriendAdd from '../../components/FriendAdd';
import SearchFriend from '../../components/SearchFriend'
import { AuthContext } from "../../context/auth.context"
import { getProfilesListService } from "../../services/profile.services";

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
      console.log("response data: ", response.data);
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
    console.log(filterArr);
    setFriendListToShow(filterArr);
  };

  //to hide the form unless pressing the button
  const toggleForm = () => setFormIsShowing(!formIsShowing);

  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      {isLoggedIn === true && (
        <div>
          <button onClick={toggleForm}>Add friend</button>
          {formIsShowing === true ? (
            <FriendAdd getData={getData} hideForm={setFormIsShowing} />
          ) : null}
        </div>
      )}

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
                    src={eachFriend.photo}
                    alt={eachFriend.name}
                    width={200}
                  />
                  <p>{eachFriend.username}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchFriends;
