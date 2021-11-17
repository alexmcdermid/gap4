import Background from "../../img/background.png";
import './Signup.css';

export default function Signup(props) {
    return (
        <div className="login">
            <div className = 'background'style={{backgroundImage: "url(" + Background + ")"}} >
                <div >Hello</div>
            </div>
                <div className='login-details'>
                    <span className='title'>Create an Account</span>
                    <span className='sub-title'>Let's get started!</span>
                    <div className='form'>
                    <label className='name'>Name</label>
                        <input name='name' className='name'></input>
                        <label className='email-address'>Email address</label>
                        <input name='email' className='email'></input>
                        <label className='password'>Password</label>
                        <input name='password' className='password-detail'></input>
                        <button className='submit-login' type='submit'>Create Account</button>
                    </div>
                </div>
           
        </div>
    )
}