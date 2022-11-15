import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import FriendProfile from './pages/profile-pages/FriendProfile';
import MyProfile from './pages/profile-pages/MyProfile';
import RecipesList from './pages/Recipe-pages/RecipesList';

import IsPrivate from './components/IsPrivate';
import Footer from './components/Footer';
import RecipeDetails from './pages/Recipe-pages/RecipeDetails';
import FriendsList from './pages/profile-pages/FriendsList';
import ProfileEdit from './pages/profile-pages/ProfileEdit';
import RecipeEdit from './pages/Recipe-pages/RecipeEdit';

function App() {


  
  return (
    <div className="App">

        <Navbar/>

        <Routes>

          {/* public pages*/}
          <Route path='/' element= {<Home/> }/>
          <Route path='/signup' element= {<Signup  /> }/>
          <Route path='/login' element= {<Login /> }/>
          <Route path='/recipes-list' element= { <RecipesList /> }/>
          <Route path='/recipes/:recipeId/details' element= { <RecipeDetails /> }/>
          <Route path='/recipes/:recipeId/edit' element= { <RecipeEdit /> }/>
          

          {/* private pages*/}
          <Route path='/profile/my-profile' element= { <IsPrivate> <MyProfile /> </IsPrivate> }/>
          <Route path='/profile/search-friends' element= { <IsPrivate> <FriendsList /> </IsPrivate> }/>
          <Route path='/profile/:userId/details' element= { <IsPrivate> <FriendProfile /> </IsPrivate> }/>
          <Route path='/profile/:userId/edit' element= { <IsPrivate> <ProfileEdit /> </IsPrivate> }/>

          
          
          {/* errors page*/}
          <Route path='/error' element= {<Error /> }/>
          <Route path='*' element= {<NotFound/> }/>

        </Routes>

        <Footer/>

    </div>
  );
}

export default App;
