import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Profile from './pages/profile-pages/Profile';
import MyProfile from './pages/profile-pages/MyProfile';
import RecipesList from './pages/Recipe-pages/RecipesList';

import IsPrivate from './components/IsPrivate';
import Footer from './components/Footer';
import RecipeDetails from './pages/Recipe-pages/RecipeDetails';
import FindFriends from './pages/profile-pages/FindFriends';
import ProfileEdit from './pages/profile-pages/ProfileEdit';

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
          <Route path='/recipe/:recipeId/details' element= { <RecipeDetails /> }/>
          

          {/* private pages*/}
          <Route path='/profile/my-profile' element= { <IsPrivate> <MyProfile /> </IsPrivate> }/>
          <Route path='/profile/:userId/details' element= { <IsPrivate> <Profile /> </IsPrivate> }/>
          <Route path='/profile/:userId/edit' element= { <IsPrivate> <ProfileEdit /> </IsPrivate> }/>

          
          <Route path='/find-friends' element= { <IsPrivate> <FindFriends /> </IsPrivate> }/>
          
          {/* errors page*/}
          <Route path='/error' element= {<Error /> }/>
          <Route path='*' element= {<NotFound/> }/>

        </Routes>

        <Footer/>

    </div>
  );
}

export default App;
