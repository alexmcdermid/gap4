import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";

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
            <h1>Search Component</h1>
            <input onChange={this.handleSearchChange}/>
            <button onClick={()=>{this.handleSearchSubmit(this)}}>Submit</button>
            </>
        );
    }
}

export default Search;