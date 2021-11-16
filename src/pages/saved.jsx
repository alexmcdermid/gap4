import { Component } from 'react';
import '../App';
import '../App.css'
import {Alert} from 'react-bootstrap'
import Word from '../components/Word/Word'


class Saved extends Component {
    state = {
        data:null,
        alertDelete:false,
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
    handleDeleteWordSearch = async (id) => {
        console.log(id)
        try{
            await fetch(`api/saved/delete/${id}`)
            this.componentDidMount()
            this.setState({alertDelete:true})
            this.handleDeleteAlertTime()
        } catch (err) {
            console.log('error deleting search word', err)
        }
    }
    handleDeleteWord = (parentId,word,index) => {
        console.log(parentId,word,index)
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
                Saved Page
            <Alert show={this.state.alertDelete} variant='success'>
            <Alert.Heading>Words Deleted!</Alert.Heading>
            </Alert>
            <div className='savedPageResults'>
            {this.state.data != null ? 
            this.state.data.map((item,index)=>{
                return(<div key={index} className='savedResultsDiv'><span className='inputWord'>
                    <div className='buttonLink'>{item.inputWord}</div>
                    <div className='date'>{item.createdAt}</div>
                    <button className='buttonLink' onClick={()=>{this.handleDeleteWordSearch(item._id)}}>Delete</button>
                    </span><div className='savedWordsContainer'>
                    <Word array={item.selectedWord} parentId={item._id} handleDeleteWord={this.handleDeleteWord}/>
                    
                            <span className='inputWord' style={{backgroundColor:'red'}}>
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