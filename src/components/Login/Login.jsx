import Background from "../../img/background.png";
import './Login.css';

export default function Login(props) {
    return (
        <div className="login">
            <div className = 'background'style={{backgroundImage: "url(" + Background + ")"}} >
                <div >Hello</div>
            </div>
                <div className='login-details'>
                    <span className='title'>Login</span>
                    <span className='sub-title'>Let's get to rhyming!</span>
                    <div className='form'>
                        <label className='email-address'>Email address</label>
                        <input name='email' className='email'></input>
                        <label className='password'>Password</label>
                        <input name='password' className='password-detail'></input>
                        <button className='submit-login' type='submit'>Log In</button>
                        <span className='forgot-password'>Forgot Password</span>
                    </div>
                </div>
           
        </div>
    )
}

