import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Profile.css';
import UserLogOut from '../UserLogOut/UserLogOut.jsx'

export default function Profile(props) {

    return (
        <div className="profile">
            <div className='details'>
                <div className="image"><FontAwesomeIcon className="trash" icon={faUser} size="3x" color='#cc9933' /></div>
                <div className="name-details">
                    <span className='name'>{props.user}</span><br />
                    <span className='email'>{props.email}</span></div>
            </div>
            <div className='general-profile'>
                <span className='general'>General</span>
                <span className='edit-profile'>Edit Profile</span>
                <span className='history'>View History</span>
                <span className='language'>Change Language</span>
            </div>
            <div className='legal-profile'>
                <span className='legal'>Legal</span>
                <span className='change-password'>Change Password</span>
                <span className='privacy'>Privacy Policy</span>
            </div>
            <div className='personal-profile'>
                <span className='personal'>Personal</span>
                <span className='report'>Report a Bug</span>
                <span className='logout'><UserLogOut></UserLogOut></span>
            </div>
        </div>
    )
}