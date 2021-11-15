import { Component } from "react"

class Result extends Component {
    changeColor(){
        console.log(123)
    }
    render(){
        return(
            <div className="resultItem">
                {this.props.data.map(function(item,index){return(
                    <button className='buttonLink' key={index} onClick={()=>{this.props.handleWordSave(item.word)}}>{item.word},&nbsp;</button>
                )})}
            </div>
        )
}
}

export default Result;
