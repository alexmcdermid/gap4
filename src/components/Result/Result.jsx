export default function Result(props){
  
    return(
        <div className="resultItem">


            {props.data.map(function(item,index){if (true) return(
                <button className='buttonLink' key={index} onClick={()=>{props.handleWordSave(item.word)}} style={props.wordsToSave.includes(item.word) ? {color:'red'} : {color:'black'}}>{item.word},&nbsp;</button>
            )})}
          
            
        </div>
    )
}