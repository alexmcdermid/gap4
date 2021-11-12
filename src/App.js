import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Search/>
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
          </Container>
        </Navbar>
      
      </div>
    );
  }
}

export default App;
