import { Component } from 'react';
import '../App';
import '../App.css'
import {Alert} from 'react-bootstrap'
import Word from '../components/Word/Word'


class Saved extends Component {
    state = {
        data:null,
        alertDelete:false,
        deletedWord:null,
        wordGroup: false,
    }
    handleDeleteAlertTime=()=>{
        setTimeout(()=>{
          this.setState({alertDelete:false})
        },3000)
      }
    routeChange=()=>{
        let path = ''
        this.props.history.push(path)
    }
    handleDeleteWordSearch = async (id,word) => {
        console.log(id)
        try{
            await fetch(`api/saved/delete/${id}`)
            this.componentDidMount()
            this.setState({alertDelete:true,deletedWord:word,wordGroup:true})
            this.handleDeleteAlertTime()
        } catch (err) {
            console.log('error deleting search word', err)
        }
    }
    handleDeleteWord = async (parentId,word,index) => {
        console.log(parentId,word,index)
        try{
            await fetch(`api/saved/delete/${parentId}/${index}`)
            this.componentDidMount()
            this.setState({alertDelete:true,deletedWord:word,wordGroup:false})
            this.handleDeleteAlertTime()
        } catch (err) {

        }
    }
    async componentDidMount(){
        try{
            let response = await fetch('/api/saved')
            let saves = await response.json()
            console.log(saves)
            this.setState({
                data:saves
            })

        } catch (err) {
            console.log('error fetching saved words', err)
        }
    }
    render() {
        return(
            <div className='savedPage'>
            <div className='topText'>SAVES PAGE</div>
            {this.state.wordGroup===false ?
            <Alert show={this.state.alertDelete} variant='success'>
            <Alert.Heading>Word '{this.state.deletedWord}' Deleted!</Alert.Heading>
            </Alert>
            :
            <Alert show={this.state.alertDelete} variant='success'>
            <Alert.Heading>Word Group '{this.state.deletedWord}' Deleted!</Alert.Heading>
            </Alert>
            }
            <div className='savedPageResults'>
            {this.state.data != null ? 
            this.state.data.map((item,index)=>{
                return(<div key={index} className='savedResultsDiv'><span className='inputWord'>
                    <div className='buttonLink'>{item.inputWord}</div>
                    <div className='date'>{item.createdAt}</div>
                    <button className='buttonLink' onClick={()=>{this.handleDeleteWordSearch(item._id,item.inputWord)}}>Delete</button>
                    </span><div className='savedWordsContainer'>
                    <Word array={item.selectedWord} parentId={item._id} handleDeleteWord={this.handleDeleteWord}/>
                    
                            <span className='inputWord' style={{backgroundColor:'#0b7dfd'}}>
                                <button className='buttonLink' onClick={()=>{this.routeChange()}}>Add +</button>
                                </span>
                            </div>
                    </div>)
            }) 
            : <></>}
            </div>
            </div>
        );
    }
}

export default Saved;