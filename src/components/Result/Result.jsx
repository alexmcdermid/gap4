export default function Result(props){
    return(
        <div className="resultItem">
             <button className='buttonLink' onClick={()=>{console.log(`add item ${props.word} to list of words to save`)}}>{props.word},&nbsp;</button>
        </div>
    )
}