import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">

        <Navbar/>

        <Routes>

          {/* public pages*/}
          <Route path='/' element= {<Home/> }/>
          <Route path='/signup' element= {<Signup/> }/>
          <Route path='/login' element= {<Login /> }/>

          {/* private pages*/}
          <Route path='/profile' element= { <IsPrivate> <Profile /> </IsPrivate> }/>

          {/* errors page*/}
          <Route path='/error' element= {<Error /> }/>
          <Route path='*' element= {<NotFound/> }/>

        </Routes>

    </div>
  );
}

export default App;
