import Login from "../../components/Login/Login";
import React, { Component } from 'react';
// // Add the Route named import
// import { Route, Switch, Redirect } from 'react-router-dom';
// import AuthPage from '../AuthPage/AuthPage.jsx'
// import HomePage from '../home.jsx';


class LoginPage extends React.Component{
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {

        // 1. POST our new user info to the server
        const fetchResponse = await fetch('/api/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.state.email, password: this.state.password, })
          })
    
          // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
          if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
    
          let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
          localStorage.setItem('token', token);  // 4. Stick token into localStorage
    
          const userDoc = JSON.parse(window.atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
          this.props.setUserInState(userDoc)

    } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }
  render(){
    return(
        <>
        <Login handleChange = {this.handleChange}
        handleSubmit = {this.handleSubmit}
        email= {this.state.email}
        password = {this.state.password}/>
        </>
    );
}
}

export default LoginPage;

// class LoginPage extends Component {
//   render() {
//     return (

//       <main className="LoginPage">
//               {/* <>
//             <Login />
//             </> */}
//         {/* this ternary operator asks: is there a user in state? */}
//         {/* if yes, they can see our pages: neworder, etc. */}
//         {/* if no(user is null), show them only the <AuthPage> */}
//         { this.state.user ? 
//           <Switch>
//               {/* until I add logout functionality, comment out next lines */}
//             {/* <Route path='/' render={(props) => (
//               <HomePage {...props}/>
//             )}/> */}
//             <Route path='/login' render={(props) => (
//               <AuthPage {...props}/>
//             )}/>
//             <Redirect to="/login" />
//           </Switch>
//           :
//           <AuthPage setUserInState={this.setUserInState}/>
//         }
//       </main>
//     );



    
//   }
// }

// export default LoginPage;