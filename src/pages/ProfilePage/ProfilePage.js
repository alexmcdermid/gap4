import React from "react";
import Profile from "../../components/Profile/Profile";
import jwt_decode from 'jwt-decode';

class ProfilePage extends React.Component {
    state = {
        user: null,
        email: null,
        user: true,
    }
    async componentDidMount() {
        try {
            let jwt = localStorage.getItem('token');
            const decoded = jwt_decode(jwt);
            let response = await fetch('/api/saved',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt,
                        'Content-type': 'application/jason'
                    }
                });
            let saves = await response.json()
            console.log(saves)
            this.setState({
                user: decoded.user.name,
                email: decoded.user.email
            })
        } catch (err) {
            console.log('error:', err)
        }
    }

    render() {
        return (
            <>
                <Profile user={this.state.user}
                    email={this.state.email} />
            </>
        );
    }
}

export default ProfilePage;