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
        maxScoreData:null
    }
    handleSearchChange = (e) => {
        this.setState({
            search:e.target.value
        })
    }
    handleSyllableSort=(data)=>{
        let tempArr = data
        let returnArr = []
        let maxSyllables = 1;
        let currentSyllable = 1;
       
        while (currentSyllable<=maxSyllables) {
        for (let i = 0; i<tempArr.length; i++){
            //find and set max syllable in search
            if (maxSyllables < tempArr[i].syllables) maxSyllables = tempArr[i].syllables
            //add syllables to return arr in order
            if (tempArr[i].syllables == currentSyllable) returnArr.push(tempArr[i])
        }
        currentSyllable++
        }   
        return returnArr
    }
    handleSearchSubmit = async () =>{
        const data = await getRhymes(this.state.search)
        const dataSorted = this.handleSyllableSort(data)
        this.setState({
            data:dataSorted
        })
        this.props.handSearchUpdateDate(this.state.data,null,this.state.search)
    }
    handleFilterMaxScore = () => {
        if (this.state.data!=null) {
            let tempArr = this.state.data.map(item=>item)
            let returnArr = []
            for (let i = 0; i<tempArr.length; i++){
                if (tempArr[i].score===300) returnArr.push(tempArr[i])
            }
            this.props.handSearchUpdateDate(returnArr,'MaxScoreOnly',this.state.search)   
            this.setState({maxScoreData:returnArr}) 
        }
    }
    handleReset = () => {
        if (this.state.data!=null) {
            this.props.handSearchUpdateDate(this.state.data,null,this.state.search)   
        }
    }
    render(){
        return (
            <div className='searchbarWrapper'>
            <input className='mainInput' onChange={this.handleSearchChange} placeholder='   Search' />
            {/* could probably change this back to the default button type and style like the search result links */}
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