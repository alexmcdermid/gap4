import { Component } from 'react';
import Search from '../Search/Search'
import Result from '../Result/Result';
import { Toast, ToastContainer, Alert, ToastBody, Navbar, Container } from 'react-bootstrap';

class HomeComp extends Component {

    state = {
        search:null,
        data:null,
        filters:null,
        wordsToSave:[],
        alertSave:false,
        maxSyllables:null,
        dataBySyllables:[],
        user:true
      }
      handSearchUpdateDate = (data,filter,search,maxSyllables) => {
        //splitting the sorted data array into many arrays each representing an array of words of a certain syllable
        let arrOfArr = []
        let count = 1;
        while (count<=maxSyllables) {
          let tempArr = []
          for(let i = 0; i<data.length; i++){
            if (data[i].syllables == count) tempArr.push(data[i])
          }
          arrOfArr.push(tempArr)
          count++
        }
        this.setState({
          search:search,
          data:data,
          filters:filter,
          maxSyllables:maxSyllables,
          dataBySyllables:arrOfArr,
        })
         
      }
      handleWordSave = (word) => {
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
      handleClearAllSaveWords=()=>{
        let tempArr = [];
        this.setState({
          wordsToSave:tempArr
        })
      }
      handleSubmitSavedWords=async(event)=>{
        event.preventDefault();
        try{
          let jwt = localStorage.getItem('token')
          let response = await fetch('/api/add', {
            method: 'POST',
            headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
            body: JSON.stringify({search: this.state.search, words: this.state.wordsToSave, })
          })
          console.log(response)
          this.setState({wordsToSave:[],alertSave:true})
          this.handleSaveAlertTime()
        } catch (err) {
          console.log('words to save submit error saving to db', err)
        }
      }
      handleSaveAlertTime=()=>{
        setTimeout(()=>{
          this.setState({alertSave:false})
        },3000)
      }
      handleRemoveSingleWordFromToSave=(item)=>{
        let tempArr = this.state.wordsToSave
        for (let i = 0; i<tempArr.length; i++) {
            if(tempArr[i] === item) tempArr.splice(i,1)
        }
        this.setState({wordsToSave:tempArr})
      }
      handleRedirectToLogin=()=>{

      }

    render() {
        return(

            <div className='searchPageWrapper'>
        <Search handSearchUpdateDate={this.handSearchUpdateDate}/>
        {this.state.filters==null ? <></>:<>Filter: {this.state.filters}</> }
        {/* saved alert */}
       <Alert show={this.state.alertSave} variant='success'>
         <Alert.Heading>Words Saved!</Alert.Heading>
         </Alert>
        {/* results */}
        {this.state.data!=null ?  <div className='resultsContainter'>
        <div className='resultsHeader'> Results: {this.state.data.length} Words
        <br/> Tap words to add to saved list </div>
        <div className='results'>
          {/* mapping the sorted by syllables and split array of arrays */}
          {this.state.dataBySyllables.map((item,index)=>{if (item.length>0) return(
          <div key={index}>
          <div className='syllableText'>Syllables: {index+1}</div>
          <Result data={item} handleWordSave={this.handleWordSave} wordsToSave={this.state.wordsToSave} maxSyllables={this.state.maxSyllables} />
          </div>
          )})}
          </div></div> 
          : 
          // stuff on the page when no search
          <div className='homeNoSearchWrapper'>
            <div className='homeWelcomeText'>Welcome User, let's get to writing!</div>
            <div className='homeGreyText'>Remember you can sort by Filters!</div>
            <div className='yellowBoxesContainer'>
              <div className='yellowBox'># of Syllables</div>
              <div className='yellowBox'>Rhyme Score</div>
            </div>
            <div className='homeGreyText'>Top searches</div>
            <div className='bigRedStartWritingButtonContainer'>
            <div className='bigRedStartWritingButton'> Start Writing! </div>
            </div>
          </div>}
        {/* toats */}
        {this.state.wordsToSave.length > 0 ?  
        <Navbar  bg="light" expand="lg" fixed='bottom'>
          <Container>
          <ToastContainer className="p-3" position='bottom-center' style={{marginBottom:'20%'}}>
            {this.state.user===true ?
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
            <span className='saveClearButtonBar'>
            <button className='bigRedLoginToSave' onClick={this.handleRedirectToLogin}>Login To Save</button>
            </span>
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