import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";

class Search extends Component {
    state={
        search:""
    }
    handleSearchChange = (e) => {
        this.setState({
            search:e.target.value
        })
    }
    handleSearchSubmit(){

    }
    render(){
        return (
            <>
            <h1>Search Component</h1>
            <input onChange={this.handleSearchChange}/>
            <button onClick={this.handleSearchSubmit}>Submit</button>
            </>
        );
    }
}

export default Search;