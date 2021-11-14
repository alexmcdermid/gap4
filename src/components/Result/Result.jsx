export default function Result(props){
    return(
        <div className="resultItem">
             <button className='buttonLink' onClick={()=>{console.log(123)}}>{props.word},&nbsp;</button>
        </div>
    )
}