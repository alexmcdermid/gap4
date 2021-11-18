import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faHeart, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import NoteBookPage from './pages/NoteBookPage/NoteBookPage';
import NoteBookAddPage from './pages/NoteBookPage/NoteBookAddPage';
import NoteBookEditPage from './pages/NoteBookPage/NoteBookEditPage';
import HomePage from '../src/pages/home';
//import AuthPage from './pages/AuthPage/AuthPage';
import Saved from './pages/saved';
import ProfilePage from './pages/ProfilePage/ProfilePage';
 import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

class App extends Component {
  state = {
    user: null,
    showLogin: true,
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else {
        let userDoc = payload.user // grab user details from token
        this.setState({ user: userDoc })
      }
    }
  }

  // a method to update user
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }

  render() {
    return (
      <div className="App">
        {/* <div className='topText'>RHYME TIME</div> */}

        <BrowserRouter>
          {this.state.user ?
            <Switch>
              <Route exact path='/' render={(props) => (
                <HomePage {...props} />
              )} />

              <Route exact path='/saved' render={(props) => (
                <Saved {...props} />
              )} />
              <Route exact path='/notebook' render={(props) => (
                <NoteBookPage {...props} />
              )} />
              <Route exact path='/notebook/add' render={(props) => (
                <NoteBookAddPage {...props} />
              )} />
              <Route exact path='/notebook/update/:id' render={(props) => (
                <NoteBookEditPage {...props} />
              )} />
              <Route exact path='/profile' render={(props) => (
                <ProfilePage {...props} />
              )} />

              {/* and in case nothing matches, we redirect: */}
              <Redirect to="/" />
            </Switch>
            :

            <Switch>
                < Route path='/login' render={(props) => (
                  <LoginPage {...props} setUserInState={this.setUserInState} />
                )} />
              
              <Route path='/signup' render={(props) => (
                <SignupPage {...props} setUserInState={this.setUserInState} />
              )} /> 
            </Switch>
          }
        </BrowserRouter>


        {/* bottom navbar */}
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
            <Nav.Link href="/"><div className='bottomNavElement'><FontAwesomeIcon icon={faSearch} size="2x" />Search</div></Nav.Link>
            <Nav.Link href="/notebook"><div className='bottomNavElement'><div className='notebook'><FontAwesomeIcon icon={faEdit} size="2x" /></div>Notebook</div></Nav.Link>
            <Nav.Link href="/saved"><div className='bottomNavElement'><FontAwesomeIcon icon={faHeart} size="2x" />Saved</div></Nav.Link>
            <Nav.Link href="/profile"><div className='bottomNavElement'><FontAwesomeIcon icon={faUser} size="2x" />Profile</div></Nav.Link>
          </Container>
        </Navbar>
      </div>

    );
  }
}

export default App;