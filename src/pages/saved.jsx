import { Component } from 'react';
import '../App';

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
            <>
            {this.state.data != null ? 
            this.state.data.map((item,index)=>{
                return(<div key={index}>inputword:{item.inputWord}<br/>selectedwords:{item.selectedWord}<hr/></div>)
            }) 
            : <></>}
            </>
        );
    }
}

export default Saved;