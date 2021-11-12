import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import { Navbar,Container,Nav } from 'react-bootstrap';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Search/>
          </Container>
        </Navbar>
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
          <Nav.Link href="#action1">Search</Nav.Link>
          <Nav.Link href="#action2">Notebook</Nav.Link>
          <Nav.Link href="#action1">Saved</Nav.Link>
          <Nav.Link href="#action2">Profile</Nav.Link>
          </Container>
        </Navbar>
      
      </div>
    );
  }
}

export default App;
