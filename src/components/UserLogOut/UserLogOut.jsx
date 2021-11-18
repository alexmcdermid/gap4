import React from 'react';
import './UserLogOut.css'

class UserLogOut extends React.Component {
  
logOut = () =>{
  let token = localStorage.getItem('token')
  if (token) {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}


  render() {
  return (
    
      <div className='UserLogOut'>
        <button className = 'userlogout'onClick={this.logOut} >Log Out</button>
      </div>
  );
  }
}

export default UserLogOut;