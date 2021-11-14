import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";
import {Dropdown} from 'react-bootstrap'

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
            <div className='searchDiv'>
            <input className='mainInput' onChange={this.handleSearchChange} />
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={()=>{console.log(123)}}>Filter</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>{console.log(456)}}>Filter2</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <button onClick={()=>{this.handleSearchSubmit(this)}}>Submit</button>
            </div>
        );
    }
}

export default Search;