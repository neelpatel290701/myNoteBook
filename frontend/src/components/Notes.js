import React, { useContext, useEffect, useRef , useState } from 'react'
import NoteContext from '../context/noteContext'
import NoteItem from './NoteItem';

export default function Notes() {

  const noteContext = useContext(NoteContext);
  const { notes, getNotes , editNote} = noteContext;

  const [note , setNote] = useState({id : "" , etitle:"",edescription:"",etag:""})

  const ref = useRef(null)
  const refclose = useRef(null)

  const onChange =(e)=>{
    setNote({...note , [e.target.name]: e.target.value})
    }

  useEffect(() => {
    getNotes()
  }, [])

  const updateNote = (currentnote)=>{
    ref.current.click() ;
    setNote({id : currentnote._id, etitle : currentnote.title , edescription : currentnote.description , etag : currentnote.tag});  
  }

  const handleClick = (e)=>{
    e.preventDefault();
    editNote(note.id , note.etitle , note.edescription , note.etag);
    refclose.current.click() ;
}

  return (
    <>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3 my-4">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="titleHelp" onChange={onChange} minLength={3} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={3} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                </div>

              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <h2 className='container text-center mx-4 my-3'>My Notes</h2>
        {notes.length == 0 && 'No Notes to Display'}
        {
          notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote} />
          })
        }
      </div>
    </>
  )
}
