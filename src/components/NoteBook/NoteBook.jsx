import './NoteBook.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTrashAlt, faEdit, faMicrophone } from "@fortawesome/free-solid-svg-icons";


function NoteBook(props) {
    let todaysDate = (new Date()).toLocaleDateString('en-CA')
    return (
        <div class="writing-folder">
            <div className="notebook">Notebook</div>
            <div className="search-field">
                <div className="microphone"><FontAwesomeIcon className="trash" icon={faMicrophone} size="0.5x" color='rgb(156, 154, 154)' /></div>
                <span className="placeholder-label">Search</span>
                <div className="search"><FontAwesomeIcon icon={faSearch} size="0.5x" color='rgb(156, 154, 154)' /></div>
            </div>
            {props.items.length > 0 ?
                <div className='entity'>
                    {props.items.length > 1 ?
                        <span className="entry">
                            {props.items.length} Entries
                        </span>
                        :
                        <span className="entry">
                            1 Entry
                        </span>
                    }
                    <Link className="squareandpencil" to={'/notebook/add'}><FontAwesomeIcon icon={faEdit} size="0.5x" color='#cc9933' />
                    </Link>
                </div>
                :
                <div className='entity'>
                    <span className="entry">
                        0 Entries
                    </span>
                    <Link className="squareandpencil" to={'/notebook/add'}><FontAwesomeIcon icon={faEdit} size="0.5x" color='#cc9933' />
                    </Link>
                </div>
            }
            {props.items.length > 0 ?
                <div className='searched-items'>
                    {props.items.map(item => (

                        <div className='items' key={item._id}><Link id='item' to={'/notebook/update/' + item._id}>{item.title} </Link><br />
                            <span className="date">{todaysDate}</span>
                            <button type='submit' className="trash" onClick={() => { props.delete(item._id) }}> <FontAwesomeIcon icon={faTrashAlt} size="0.5x" color='rgb(24, 23, 23)' /></button><br /></div>
                    ))}
                </div>
                :
                <div className='searched-items'>
                    <div className='items' >No notes yet <br />
                        <span className="message">Click the notepad below to start!</span>
                        <button type='submit' id="trash" > <FontAwesomeIcon icon={faTrashAlt} size="0.5x" color='rgb(24, 23, 23)' /></button><br /></div>
                </div>
            }

        </div>
    )

} export default NoteBook;