import './NoteBookAdd.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";


function NoteBookAdd(props) {
    return (
        <div >
              <div className='topText'>
            Rhyme Time Notes
            </div>
            <div className='header-text'>
                <Link to='/notebook'>
                    <div className="back"><FontAwesomeIcon className="trash" icon={faAngleLeft} size="2px" color='#cc9933' /></div></Link>
                    <Link id = 'notes' to='/notebook'> <span className="notes">Notes</span></Link>
                <span className="submit" onClick={() => props.addWriting()}>Add Note</span>
            </div><br />
            <div className='writings'>
                <textarea className='title' name='title' value={props.title} onChange={(event) => props.handleChange(event)}></textarea>
                <textarea type='description' className='sentence' name="sentence" value={props.sentence} onChange={(event) => props.handleChange(event)} rows ='10' ></textarea>
            </div>
        </div>
    )
}
export default NoteBookAdd;