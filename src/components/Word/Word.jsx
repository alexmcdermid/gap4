export default function Result(props){
    return(
        <>
          {props.array.map((item,index)=>{
                        return(<span className='savedWord' key={index}>
                            <button className='buttonLink' onClick={()=>{props.handleDeleteWord(props.parentId,item,index)}}>{item}&nbsp;x</button>
                            </span>)})} 
        </>
    )
}