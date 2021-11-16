import './NoteBookAdd.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";


function NoteBookAdd(props) {
    return (
        <div >
            <div className='header-text'>
                <Link to='/notebook'>
                    <div class="back"><FontAwesomeIcon className="trash" icon={faAngleLeft} size="0.5x" color='#cc9933' /></div></Link>
                <span class="notes">Notes</span>
                <span class="submit" onClick={() => props.addWriting()}>Done</span>
            </div><br />
            <div className='writings'>
                <textarea className='title' rows='2' cols='39' name='title' value={props.title} onChange={(event) => props.handleChange(event)}></textarea>
                <textarea type='description' className='sentence' name="sentence" value={props.sentence} onChange={(event) => props.handleChange(event)} cols="40" rows="50" wrap='hard'></textarea>
            </div>
        </div>
    )
}
export default NoteBookAdd;