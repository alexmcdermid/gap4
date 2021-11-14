import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";
import {Dropdown,Button} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"


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
            <input className='mainInput' onChange={this.handleSearchChange} placeholder='   Search' />
            <Button className="mainSearch" onClick={()=>{this.handleSearchSubmit(this)}}><FontAwesomeIcon icon={faSearch}/></Button>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={()=>{console.log(123)}}>Filter</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>{console.log(456)}}>Filter2</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        );
    }
}

export default Search;