import Login from "../../components/Login/Login";
import React, { Component } from 'react';
// Add the Route named import
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage.jsx'
import HomePage from '../home.jsx';

class LoginPage extends Component {

  state = {
    user: null,
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
        this.setState({user: userDoc})
      }
    }
  }

  // a method to update user
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  render() {
    return (

      <main className="LoginPage">
              <>
            <Login />
            </>
        {/* this ternary operator asks: is there a user in state? */}
        {/* if yes, they can see our pages: neworder, etc. */}
        {/* if no(user is null), show them only the <AuthPage> */}
        { this.state.user ? 
          <Switch>
              {/* until I add logout functionality, comment out next lines */}
            {/* <Route path='/' render={(props) => (
              <HomePage {...props}/>
            )}/> */}
            <Route path='/login' render={(props) => (
              <AuthPage {...props}/>
            )}/>
            <Redirect to="/login" />
          </Switch>
          :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </main>
    );



    
  }
}

export default LoginPage;