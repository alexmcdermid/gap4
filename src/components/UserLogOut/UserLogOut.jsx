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
        <button onClick={this.logOut} className="btn-sm">LOG OUT</button>
      </div>
  );
  }
}

export default UserLogOut;