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
    handleSearchSubmit = async () =>{
        const data = await getRhymes(this.state.search)
        this.setState({
            data:data
        })
        this.props.handSearchUpdateDate(this.state.data)
    }
    render(){
        return (
            <>
            <input className='mainInput' onChange={this.handleSearchChange} />
            <button onClick={()=>{this.handleSearchSubmit(this)}}>Submit</button>
            </>
        );
    }
}

export default Search;