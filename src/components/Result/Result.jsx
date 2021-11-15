export default function Result(props){
    return(
        <div className="resultItem">
            {props.data.map(function(item,index){return(
                <button className='buttonLink' key={index} onClick={()=>{props.handleWordSave(item.word)}} >{item.word},&nbsp;</button>
            )})}
        </div>
    )
}