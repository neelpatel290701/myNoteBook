import React , {useContext, useState} from 'react'
import NoteContext from '../context/noteContext'

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import {like,disLike} from '../state/action-creator'

export default function AddNote() {

    const noteContext = useContext(NoteContext) ;
    const {addNote} = noteContext ;

    const [note,setNote] = useState({title : "" , description : "" , tag : ""})

    const dispatch = useDispatch()


    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    const handleLikeClick = (e)=>{
        e.preventDefault();
        dispatch(like(10))
    }

    const handleDisLikeClick = (e)=>{
        e.preventDefault();
        dispatch(disLike(10))
    }

    const onChange = (e)=>{
            setNote({
                ...note , 
                [e.target.name] : e.target.value
            })
    }

    return (
        <div>
            <h2 className='container text-center mx-4 my-2'>Add Note</h2>
            <form className='container px-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name ="title" id="title" aria-describedby="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" id="Description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" id="tag" onChange={onChange}  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                <label htmlFor="tag" className="form-label mx-5">Like/Dislike : </label>
                <button type="submit" className="btn btn-primary mx-2" onClick={handleDisLikeClick}>-</button>
                <button type="submit" className="btn btn-primary" onClick={handleLikeClick}>+</button>
            </form>
        </div>
    )
}
