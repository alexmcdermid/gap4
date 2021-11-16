import { Component } from 'react';
import '../App';
import '../App.css'


class Saved extends Component {
    state = {
        data:null
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
        } catch (err) {
            console.log('error deleting search word', err)
        }
    }
    handleDeleteWord = () => {
        console.log('handle delete word')
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
            <div className='savedPageResults'>
            {this.state.data != null ? 
            this.state.data.map((item,index)=>{
                return(<div key={index} className='savedResultsDiv'><span className='inputWord'>
                    <div className='buttonLink'>{item.inputWord}</div>
                    <div className='date'>{item.createdAt}</div>
                    <button className='buttonLink' onClick={()=>{this.handleDeleteWordSearch(item._id)}}>Delete</button>
                    </span><div className='savedWordsContainer'>{
                    item.selectedWord.map((item,index)=>{
                        return(<span className='savedWord' key={index}>
                            <button className='buttonLink' onClick={()=>{this.handleDeleteWord()}}>{item}&nbsp;x</button></span>)})}
                            <span className='inputWord' style={{backgroundColor:'red'}}>
                                <button className='buttonLink' onClick={()=>{this.routeChange()}}>Add +</button></span>
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