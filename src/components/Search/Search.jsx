import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";
import Result from '../Result/Result'

class Search extends Component {
    state={
        search:"",
        data:null
    }
    handleSearchChange = (e) => {
        this.setState({
            search:e.target.value
        })
    }
    async handleSearchSubmit(){
        const data = await getRhymes(this.state.search)
        this.setState({
            data:data
        })
    }
    render(){
        return (
            <>
            <input className='mainInput' onChange={this.handleSearchChange} />
            {/* could have submit only popup when mainInput is being changed */}
            <button onClick={()=>{this.handleSearchSubmit(this)}}>Submit</button>
            <h1>Search Component</h1>
            {this.state.data!=null ?  <><br/> Results:<div className='results'>{this.state.data.map(function(item,index){return(<Result word={item.word} index={index} key={index}/>)})}</div></> : <></>}
            </>
        );
    }
}

export default Search;