import { Component } from 'react';
import Search from '../Search/Search'
import Result from '../Result/Result';
import { Toast, ToastContainer, Alert, ToastBody, Navbar, Container, Nav } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';


class HomeComp extends Component {

  state = {
    search: null,
    data: null,
    filters: null,
    wordsToSave: [],
    alertSave: false,
    maxSyllables: null,
    dataBySyllables: [],
    user: true,
    pastSearchData: [],
    userName: null,
    update:false,
  }
  handSearchUpdateDate = (data, filter, search, maxSyllables) => {
    //splitting the sorted data array into many arrays each representing an array of words of a certain syllable
    let arrOfArr = []
    let count = 1;
    while (count <= maxSyllables) {
      let tempArr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].syllables == count) tempArr.push(data[i])
      }
      arrOfArr.push(tempArr)
      count++
    }
    this.setState({
      search: search,
      data: data,
      filters: filter,
      maxSyllables: maxSyllables,
      dataBySyllables: arrOfArr,
    })

  }
  handleWordSave = (word) => {
    let tempArr = this.state.wordsToSave.map(item => item)
    if (!tempArr.includes(word)) {
      tempArr.push(word)
      this.setState({
        wordsToSave: tempArr
      })
    } else {
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === word) tempArr.splice(i, 1)
      }
      this.setState({
        wordsToSave: tempArr
      })
    }
  }
  handleClearAllSaveWords = () => {
    let tempArr = [];
    this.setState({
      wordsToSave: tempArr
    })
  }
  handleSubmitSavedWords = async (event) => {
    event.preventDefault();
    try {
      let jwt = localStorage.getItem('token')
      let response = await fetch('/api/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
        body: JSON.stringify({ search: this.state.search, words: this.state.wordsToSave, })
      })
      console.log(response)
      this.setState({ wordsToSave: [], alertSave: true })
      this.handleSaveAlertTime()
    } catch (err) {
      console.log('words to save submit error saving to db', err)
    }
  }
  handleSaveAlertTime = () => {
    setTimeout(() => {
      this.setState({ alertSave: false })
    }, 3000)
  }
  handleRemoveSingleWordFromToSave = (item) => {
    let tempArr = this.state.wordsToSave
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === item) tempArr.splice(i, 1)
    }
    this.setState({ wordsToSave: tempArr })
  }


  async componentDidMount() {
    try {
      let jwt = localStorage.getItem('token')
      //decode jwt to get username
      const decoded = jwt_decode(jwt);
      //had to do this avoid temp screen flash of other screen because the second setstate relies on async
      this.setState({
        userName: decoded.user.name
      })
      let response = await fetch('/api/saved',
        { headers: { 'Authorization': 'Bearer ' + jwt } });
      let saves = await response.json()
      this.setState({
        pastSearchData: saves,
      })

    } catch (err) {
      console.log('error fetching saved words', err)
    }
  }

  render() {
    return (

      <div className='searchPageWrapper'>
        <div className='topText'>
          Rhyme Time Home
        </div>
        <Search handSearchUpdateDate={this.handSearchUpdateDate} />
        {this.state.filters == null ? <></> : <>Filter: {this.state.filters}</>}
        {/* saved alert */}
        <Alert show={this.state.alertSave} variant='success'>
          <Alert.Heading>Words Saved!</Alert.Heading>
        </Alert>
        {/* results */}
        {this.state.data != null ? <div className='resultsContainter'>
          <div className='resultsHeader'> Results: {this.state.data.length} Words
            <br /> Tap words to add to saved list </div>
          <div className='results'>
            {/* mapping the sorted by syllables and split array of arrays */}
            {this.state.dataBySyllables.map((item, index) => {
              if (item.length > 0) return (
                <div key={index}>
                  <div className='syllableText'>Syllables: {index + 1}</div>
                  <Result data={item} handleWordSave={this.handleWordSave} wordsToSave={this.state.wordsToSave} maxSyllables={this.state.maxSyllables} />
                </div>
              )
            })}
            {/* these brs are needed to keep results above navbar on scroll to bottom do not remove */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
          </div></div>
          :
          <>
          {this.state.userName != null ? 
          // stuff on the page when no search
          <div className='homeNoSearchWrapper'>
            <div className='homeWelcomeText'>Welcome {this.state.userName}, let's get to writing!</div>
            <div className='homeGreyText'>Remember you can sort by Filters!</div>
            <div className='yellowBoxesContainer'>
              <div className='yellowBox'># of Syllables</div>
              <div className='yellowBox'>Rhyme Score</div>
            </div>
            <div className='homeGreyText'>Your top saves</div>
            <div className='topSearchesContainer'>
              {/* grab up to 10 of the most recent searches and display them if nothing is searched */}
              {this.state.pastSearchData.map((item, index) => {
                if (index < 10) return (<button className='wordToSaveToast'
                  onClick={() => { console.log('todo - on click search this item') }}
                  key={index}>{item.inputWord}</button>)
              })}
            </div>
            <Navbar bg="light" expand="lg" fixed='bottom'>
              <Container>
                <ToastContainer className="p-3" position='bottom-center' style={{ marginBottom: '20%' }}>
                  <Toast>
                    <ToastBody>
                      <div className='linkContainer'>
                    <Link to={'/notebook'} className='redButtonLink' > Start Writing! </Link>
                    </div>
                    </ToastBody>
                  </Toast>
                </ToastContainer>
              </Container>
            </Navbar>
          </div>
          :
          //this is where the styling goes for no search no user
          <div className='homePageNoUserContainer'>
             <div className='homePageNoUserText'>
              Top recent searches
            </div>
            <div className='topSearchesContainer2'>
              {['test','owl','ball','bridge','cake','door','code','design','orange'].map((item, index) => {
                if (index < 10) return (<button className='wordToSaveToast'
                  onClick={() => { console.log('todo - on click search this item') }}
                  key={index}>{item}</button>)
              })}
            </div>
            <div className='homePageNoUserText'>
              Create an account to write and save rhymes!
            </div>
            <div className='yellowBoxesContainer'>
              <div className='yellowBox2'>
                <div className='image'></div>
                <Link onClick={()=>{window.location.href = '/login'}} className='redButtonLink' > Notebook </Link>
              </div>
              <div className='yellowBox2'>
              <div className='image'></div>
              <Link onClick={()=>{window.location.href = '/login'}} className='redButtonLink' > Saved </Link>
              </div>
            </div>
            <Navbar bg="light" expand="lg" fixed='bottom'>
              <Container>
                <ToastContainer className="p-3" position='bottom-center' style={{ marginBottom: '20%' }}>
                  <Toast>
                    <ToastBody>
                    <div className='linkContainer'>
                    <Link  onClick={()=>{window.location.href = '/signup'}} className='redButtonLink' > Create an Account Now </Link>
                    </div>
                    </ToastBody>
                  </Toast>
                </ToastContainer>
              </Container>
            </Navbar>
          </div>
          }
          </>
            
          }
        {/* toats */}
        {this.state.wordsToSave.length > 0 ?  
        <Navbar  bg="light" expand="lg" fixed='top'>
          <Container>
          <ToastContainer className="p-3" position='top-center' >
            {this.state.userName!=null ?
            <>
          <Toast>
            <Toast.Body>
            <div>
            {this.state.wordsToSave.map((item,index)=>{return(
            <span className='wordToSaveToast' key={index}>
            <button className='buttonLink' 
            onClick={()=>{this.handleRemoveSingleWordFromToSave(item)}}
            >{item}&nbsp;&nbsp;x</button>
             </span>
            )})}
            <br/>
            <span className='saveClearButtonBar'>
            <button className='bigRedSaveButton' onClick={this.handleSubmitSavedWords}>Save Selection</button>
            <button className='bigRedClearButton' onClick={this.handleClearAllSaveWords}>Clear</button>
            </span>
            </div>
            </Toast.Body>
          </Toast>
          </>
          :
          <Toast>
            <ToastBody>
            {this.state.wordsToSave.map((item,index)=>{return(
            <span className='wordToSaveToast' key={index}>
            <button className='buttonLink' 
            onClick={()=>{this.handleRemoveSingleWordFromToSave(item)}}
            >{item}&nbsp;&nbsp;x</button>
             </span>
            )})}
            <br/>
            <div className='linkContainer'>
            <Link onClick={()=>{window.location.href = '/login'}} className='redButtonLink' >Login To Save</Link>
            
            </div>
            </ToastBody>
          </Toast>
          }
        </ToastContainer>
        </Container>
        </Navbar>
         : <div/>}
            </div>
        );
    }
}

export default HomeComp;