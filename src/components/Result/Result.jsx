export default function Result(props){
    return(
        <div className="resultItem">
            {props.index+1}. {props.word}
        </div>
    )
}