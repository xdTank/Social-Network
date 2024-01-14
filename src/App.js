import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import store from './redux/reduxStore';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))



class App extends Component {
  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    alert("Some error occured")
    console.error(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandlereject", this.catchAllUnhandleErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandlereject", this.catchAllUnhandleErrors)
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
            <Route path='/project' Component={() => <Login />} />
            <Route path='/profile/:userId?' Component={withSuspense(ProfileContainer)} />
            <Route path='/dialogs' Component={withSuspense(DialogsContainer)} />
            <Route path='/users' Component={() => <UsersContainer />} />
            <Route path='/login' Component={() => <Login />} />
            <Route path='/' Component={() => <Login />} />
            <Route path='*' Component={() => <div>404 not found</div>} />
          </Routes>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  initialiazed: state.app.initialiazed
})

let AppContainer = compose(
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
  return <BrowserRouter >
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp

