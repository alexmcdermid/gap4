import React from "react";
import Signup from "../../components/Signup/Signup";

class SignupPage extends React.Component{
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
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
          const fetchResponse = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
          })
          
          // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
          if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
          
          let token = await fetchResponse.json() // 3. decode fetch response to get jwt from srv
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
            <Signup handleChange= {this.handleChange} 
            handleSubmit={this.handleSubmit}
            name = {this.state.name}
            email= {this.state.email}
            password = {this.state.password}
            confirm = {this.state.confirm}
            error = {this.state.error}/>
            </>
        );
    }
}

export default SignupPage;