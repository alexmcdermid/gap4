import './NoteBookEdit'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function NoteBookEdit(props) {
    return (
        <div class="writing-folder">
                  <div className='topText'>
            Rhyme Time Notes
            </div>
            <div >
                <div className='header-text'>

                    <Link to='/notebook'>
                        <div className="back"><FontAwesomeIcon className="trash" icon={faAngleLeft} size="0.5x" color='#cc9933' /></div></Link>
                        <Link id = 'notes' to='/notebook'> <span className="notes">Notes</span></Link>
                    <span className="submit" onClick={() => props.editWriting()}>Update</span>
                </div><br />
                <div className='writings'>
                    <textarea className='title'  name='title' value={props.title} onChange={(event) => props.onEditChange(event)}></textarea>
                    <textarea className='sentence' type='description' name="sentence" value={props.sentence} onChange={(event) => props.onEditChange(event)} rows ='10'  ></textarea>
                </div>
            </div>
        </div>
    )
}

export default NoteBookEdit;