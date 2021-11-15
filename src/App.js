import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Result from './components/Result/Result';
import { Navbar,Container,Nav, ToastContainer, Toast, ToastHeader, ToastBody } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch,faHeart,faEdit,faUser} from "@fortawesome/free-solid-svg-icons"


class App extends Component {
  state = {
    data:null,
    filters:null,
    wordsToSave:[]
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
        {/* words to save toast */}
        {this.state.wordsToSave.length > 0 ? 
        <ToastContainer position="top-center" className="p-3">
          <Toast>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">Words to save</strong>
            </Toast.Header>
            <Toast.Body>{this.state.wordsToSave.map(function(word){return(<>{word},&nbsp;</>)})}</Toast.Body>
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
