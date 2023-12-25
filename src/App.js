import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/Users';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App  = (props) => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer/>
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile/:userId?' Component={() => <ProfileContainer store={props.store} />} />
          <Route path='/dialogs' Component={() => <DialogsContainer store={props.store} />} />
          <Route path='/users' Component={() => <UsersContainer store={props.store} />} />
        </Routes>
      </div>
    </div>

  )
}
export default App;
