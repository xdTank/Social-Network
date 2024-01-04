import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/Users';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { Component } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';


class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialiazed) {
      return <Preloader />
    } 
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile/:userId?' Component={() => <ProfileContainer />} />
            <Route path='/dialogs' Component={() => <DialogsContainer />} />
            <Route path='/users' Component={() => <UsersContainer />} />
            <Route path='/login' Component={() => <Login />} />
            <Route path='/' Component={() => <Login />} />
          </Routes>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  initialiazed: state.app.initialiazed
})

export default connect(mapStateToProps, { initializeApp })(App);
