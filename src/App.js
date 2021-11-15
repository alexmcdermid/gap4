import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Result from './components/Result/Result';
import { Navbar,Container,Nav } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch,faHeart,faEdit,faUser} from "@fortawesome/free-solid-svg-icons"


class App extends Component {
  state = {
    data:null,
    filters:null
  }
  handSearchUpdateDate = (data,filter) => {
    this.setState({
      data:data,
      filters:filter
    })
     
  }
  render(){
    return (
      <div className="App">
        <br/>
        <div className='topText'>RHYME TIME HOME</div>
        <br/>
        <Search handSearchUpdateDate={this.handSearchUpdateDate}/>
        <br/>
        {this.state.filters==null ? <></>:<>Filter: {this.state.filters}</> }
        <br/>
        <div className="welcomeUser">Welcome userX</div>
        {this.state.data!=null ?  <><br/> Results: {this.state.data.length} Words
        <div className='results'>{this.state.data.map(function(item,index){return(<Result word={item.word} index={index} key={index}/>)})}</div></> : <></>}
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
