import { Component } from 'react';
import Search from '../Search/Search'
import Result from '../Result/Result';
import { Toast, ToastContainer, Alert } from 'react-bootstrap';

class HomeComp extends Component {

    state = {
        search:null,
        data:null,
        filters:null,
        wordsToSave:[],
        alertSave:false
      }
      handSearchUpdateDate = (data,filter,search) => {
        this.setState({
          search:search,
          data:data,
          filters:filter,
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
          let response = await fetch('/api/add', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
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
        {this.state.data!=null ?  <><br/> Results: {this.state.data.length} Words
        <div className='results'><Result data={this.state.data} handleWordSave={this.handleWordSave} wordsToSave={this.state.wordsToSave}/></div></> : <></>}
        {/* toats */}
        {this.state.wordsToSave.length > 0 ?  
          <ToastContainer className="p-3" position='top-center'>
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
        </ToastContainer>
       : <div/>}
       
            </div>
        );
    }
}

export default HomeComp;