import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Result from './components/Result/Result';
import { Navbar,Container,Nav } from 'react-bootstrap';

class App extends Component {
  state = {
    data:null
  }
  handSearchUpdateDate(data) {
    this.setState({
      data:data
    })
     
  }
  render(){
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Search handSearchUpdateDate={this.handSearchUpdateDate}/>
          </Container>
        </Navbar>
        {/* {this.state.data!=null ?  <><br/> Results:<div className='results'>{this.state.data.map(function(item,index){return(<Result word={item.word} index={index} key={index}/>)})}</div></> : <></>} */}
        <Navbar bg="light" expand="lg" fixed='bottom'>
          <Container fluid>
          <Nav.Link href="#linkSearch">Search</Nav.Link>
          <Nav.Link href="#linkNote">Notebook</Nav.Link>
          <Nav.Link href="#linkSaved">Saved</Nav.Link>
          <Nav.Link href="#linkProfile">Profile</Nav.Link>
          </Container>
        </Navbar>
      
      </div>
    );
  }
}

export default App;
