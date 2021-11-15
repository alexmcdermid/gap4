import { Component } from 'react';
import '../App';
import '../App.css'

class Saved extends Component {
    state = {
        data:null
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
                    <button className='buttonLink'>{item.inputWord} X</button>
                    </span><div className='savedWordsContainer'>{
                    item.selectedWord.map((item,index)=>{
                        return(<span className='savedWord' key={index}>
                            <button className='buttonLink' >{item}&nbsp;X</button></span>)})}</div>
                    </div>)
            }) 
            : <></>}
            </div>
            </div>
        );
    }
}

export default Saved;