import { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Navbar,Container,Nav } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch,faHeart,faEdit,faUser} from "@fortawesome/free-solid-svg-icons"

import HomePage from '../src/pages/home'


class App extends Component {
  
  render(){
    

    return (
      <div className="App">
       
       <BrowserRouter>
       <Switch>
          <Route path='/' render={(props) => (
            <HomePage {...props}/>
          )}/>
          
          {/* and in case nothing matches, we redirect: */}
          <Redirect to="/" />
        </Switch>
        </BrowserRouter>
       {/* bottom navbar */}
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
          <Nav.Link href="/"><div className='bottomNavElement'><FontAwesomeIcon icon={faSearch} size="2x"/>Search</div></Nav.Link>
          <Nav.Link href="#notebook"><div className='bottomNavElement'><div className='notebook'><FontAwesomeIcon icon={faEdit} size="2x"/></div>Notebook</div></Nav.Link>
          <Nav.Link href="#linkSaved"><div className='bottomNavElement'><FontAwesomeIcon icon={faHeart} size="2x"/>Saved</div></Nav.Link>
          <Nav.Link href="#linkProfile"><div className='bottomNavElement'><FontAwesomeIcon icon={faUser} size="2x"/>Profile</div></Nav.Link>
          </Container>
        </Navbar>
      
      </div>
    );
  }
}

export default App;
