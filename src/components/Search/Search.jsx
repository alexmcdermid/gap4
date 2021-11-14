import React from "react";
import { Component } from "react";
import { getRhymes } from "../../services/rhyme";
import {Dropdown,Button} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"


class Search extends Component {
    state={
        search:"",
        data:null,
        maxScoreBool:false,
        maxScoreData:null
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
    handleFilterMaxScore = () => {
        if (this.state.data!=null) {
            let tempArr = this.state.data.map(item=>item)
            let returnArr = []
            for (let i = 0; i<tempArr.length; i++){
                if (tempArr[i].score==300) returnArr.push(tempArr[i])
            }
            this.props.handSearchUpdateDate(returnArr,'MaxScoreOnly')   
            this.setState({maxScoreData:returnArr}) 
        }
    }
    handleReset = () => {
        if (this.state.data!=null) {
            this.props.handSearchUpdateDate(this.state.data,null)   
        }
    }
    render(){
        return (
            <div className='searchbarWrapper'>
            <input className='mainInput' onChange={this.handleSearchChange} placeholder='   Search' />
            <Button className="mainSearch" onClick={()=>{this.handleSearchSubmit(this)}}><FontAwesomeIcon icon={faSearch}/></Button>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={()=>{this.handleFilterMaxScore()}}>Max Scores Only</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>{this.handleReset()}}>Reset Filters</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        );
    }
}

export default Search;