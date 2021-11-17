import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Result from './components/Result/Result';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar,Container,Nav, Toast, ToastContainer } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch,faHeart,faEdit,faUser} from "@fortawesome/free-solid-svg-icons"
import AuthPage from './pages/AuthPage/AuthPage.jsx'

class App extends Component {
  state = {
    user:null,
    data:null,
    filters:null,
    wordsToSave:[]
  }

  // when the page refreshes, check localStorage for the user jwt token
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        this.setState({user: userDoc})      
      }
    }
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  handSearchUpdateDate = (data,filter) => {
    this.setState({
      data:data,
      filters:filter
    })
     
  }
  handleWordSave = (word) => {
    console.log('saving', word)
    let tempArr = this.state.wordsToSave.map(item=>item)
    if (!tempArr.includes(word)) {
      tempArr.push(word)
      this.setState({
        wordsToSave:tempArr
      })
    } else {
      for (let i = 0; i<tempArr.length; i++) {
        if (tempArr[i] === word) tempArr.splice(i,1)
      }
      this.setState({
        wordsToSave:tempArr
      })
    }
  }


  render(){
    

    return (
      <div className="App">
        
        { this.state.user ? 
          <Switch>
            <Route path='/' render={(props) => (
              <Search {...props}/>
            )}/>
            {/* <Route path='/orders' render={(props) => (
              <OrderHistoryPage {...props}/>
            )}/> */}
            <Redirect to="/" />
          </Switch>
          :
          <AuthPage setUserInState={this.setUserInState}/>
        }
        <br/>
        <div className='topText'>RHYME TIME HOME</div>
        <br/>
        <Search handSearchUpdateDate={this.handSearchUpdateDate}/>
        <br/>
        {this.state.filters==null ? <></>:<>Filter: {this.state.filters}</> }
        <br/>
        <div className="welcomeUser">Welcome userX</div>
        {/* results */}
        {this.state.data!=null ?  <><br/> Results: {this.state.data.length} Words
        <div className='results'><Result data={this.state.data} handleWordSave={this.handleWordSave} wordsToSave={this.state.wordsToSave}/></div></> : <></>}
        {/* toats */}
        {this.state.wordsToSave.length > 0 ?  
          <ToastContainer className="p-3" position='top-center'>
          <Toast>
            <Toast.Body>
            <div>
            {this.state.wordsToSave.map(function(item,index){return(
            <text key='index'>
            <button className='buttonLink' >{item}&nbsp;</button>
            <button>x</button>
             </text>
            )})}
            <br/>
            <button>clear all</button>
            <button>save</button>
            </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
       : <div/>}
      
      
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
          <Nav.Link href="#linkSearch"><div className='bottomNavElement'><FontAwesomeIcon icon={faSearch} size="2x"/>Search</div></Nav.Link>
          <Nav.Link href="#linkNote"><div className='bottomNavElement'><div className='notebook'><FontAwesomeIcon icon={faEdit} size="2x"/></div>Notebook</div></Nav.Link>
          <Nav.Link href="#linkSaved"><div className='bottomNavElement'><FontAwesomeIcon icon={faHeart} size="2x"/>Saved</div></Nav.Link>
          <Nav.Link href="#linkProfile"><div className='bottomNavElement'><FontAwesomeIcon icon={faUser} size="2x"/>Profile</div></Nav.Link>
          </Container>
        </Navbar>
      
      </div>
    );
  }
}

export default App;