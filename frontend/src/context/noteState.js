import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

        const host = "http://localhost:5000/"

        const initialNotes = []

        const [notes, setNotes] = useState(initialNotes)

        //Get Notes
        const getNotes = async () => {
                const response = await fetch(`${host}api/notes/fetchallnotes`, {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": localStorage.getItem("auth-token")
                        }
                });

                const json = await response.json()
                setNotes(json)
        }

        //Add Note
        const addNote = async (title, description, tag) => {

                const response = await fetch(`${host}api/notes/addnote`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": localStorage.getItem("auth-token")
                        },
                        body: JSON.stringify({ title, description, tag }),
                });

                const note = await response.json()
                setNotes(notes.concat(note))
        }

        const deleteNote = async (id) => {

                const response = await fetch(`${host}api/notes/deletenote/${id}`, {
                        method: "DELETE",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": localStorage.getItem("auth-token")
                        },
                });

                const newNote = notes.filter((note) => {
                        return note._id !== id;
                })
                setNotes(newNote)
        }

        const editNote = async (id, title, description, tag) => {

                const response = await fetch(`${host}api/notes/updatenote/${id}`, {
                        method: "PUT",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": localStorage.getItem("auth-token")
                        },
                        body: JSON.stringify({ title, description, tag }),
                });

                let newNotes = JSON.parse(JSON.stringify(notes))

                for (let index = 0; index < notes.length; index++) {
                        if (newNotes[index]._id === id) {
                                newNotes[index].title = title;
                                newNotes[index].description = description;
                                newNotes[index].tag = tag
                                break;
                        }
                }

                setNotes(newNotes)
        }

        return (
                <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }} >
                        {props.children}
                </NoteContext.Provider>
        )
}


export default NoteState