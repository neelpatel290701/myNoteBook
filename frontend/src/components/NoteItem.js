import React , {useContext} from 'react'
import NoteContext from '../context/noteContext'

export default function NoteItem(props) {
    const { note , updateNote} = props;
    const noteContext = useContext(NoteContext) ;
    const {deleteNote} = noteContext ;
    
    return (
        <div className='col-md-3 my-3'>
            <div class="card">
                <div class="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title text-center my-1 ">{note.title}</h5>
                    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p class="card-text">{note.description}</p>
    
                </div>
            </div>
        </div>
    )
}
