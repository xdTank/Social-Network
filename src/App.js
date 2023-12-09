import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/Users';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' Component={() => <Profile store={props.store} />} />
          <Route path='/dialogs' Component={() => <DialogsContainer store={props.store} />} />
          <Route path='/users' Component={() => <UsersContainer store={props.store} />} />
        </Routes>
      </div>
    </div>

  )
}

export default App;
