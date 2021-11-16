import './NoteBookEdit'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function NoteBookEdit(props) {
    return (
        <div class="writing-folder">
            <div >
                <div className='header-text'>
                    <Link to='/notebook'>
                        <div class="back"><FontAwesomeIcon className="trash" icon={faAngleLeft} size="0.5x" color='#cc9933' /></div></Link>
                    <span class="notes">Notes</span>
                    <span class="submit" onClick={() => props.editWriting()}>Done</span>
                </div><br />
                <div className='writings'>
                    <textarea className='title' rows='2' cols='35' name='title' value={props.title} onChange={(event) => props.onEditChange(event)}></textarea>
                    <textarea className='sentence' type='description' name="sentence" value={props.sentence} onChange={(event) => props.onEditChange(event)} cols="35"  wrap="hard"  ></textarea>
                </div>
            </div>
        </div>
    )
}

export default NoteBookEdit;