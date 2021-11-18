import Background from "../../img/background.png";
import './Login.css';
import { Toast, ToastContainer, ToastBody, Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Login(props) {
    return (
        <div className="login">
            <div className = 'background'style={{backgroundImage: "url(" + Background + ")"}} >
                <div className='topTextLogin'>Rhyme Time Login</div>
            </div>
                <div className='login-details'>
                    <span className='title'>Login</span>
                    <span className='sub-title'>Let's get to rhyming!</span>
                    <div className='form'onSubmit={(evt)=>props.handleSubmit(evt)}>
                    <form className='signupForm' autoComplete="off" >
                        <label className='email-address'>Email address</label>
                        <input name='email' className='email'  value={props.email} onChange={(evt)=>props.handleChange(evt)} required></input>
                        <label className='password'>Password</label>
                        <input type = 'password' name='password'  className='password-detail'  value={props.password} onChange={(evt)=>props.handleChange(evt)} required ></input>
                        <button className='submit-login' type='submit'>Log In</button>
                        <span className='forgot-password'>Forgot Password</span>
                        </form>
                    </div>
                </div>
                <Navbar bg="light" expand="lg" fixed='bottom'>
              <Container>
                <ToastContainer className="p-3" position='bottom-center' style={{ marginBottom: '20%' }}>
                  <Toast>
                    <ToastBody>
                        <div className='linkContainer'>
                      <Link to={'/signup'} className='redButtonLink' > Create Account </Link>
                      </div>
                    </ToastBody>
                  </Toast>
                </ToastContainer>
              </Container>
            </Navbar>
           
        </div>
    )
}

