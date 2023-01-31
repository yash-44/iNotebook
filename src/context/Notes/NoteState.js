import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    // this is for example
    // const state1 = {
    //     "name": "yash",
    //     "age": 18
    // }

    // const [state, setState] = useState(state1)

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "hiren",
    //             "age": 22
    //         })
    //     }, 2000);
    // }

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // function for get note
    const getNote = async () => {
        // Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }

    // function for add note
    const addNote = async (title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json()
        setNotes(notes.concat(note))
    }


    // function for delete note
    const deleteNote = async (id) => {
        // console.log("delete this note"+ id)

        // Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // function for edit note
    const editNote = async (id, title, description, tag) => {

        // Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)

        let newNotes =  JSON.parse(JSON.stringify(notes))
        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        // <NoteContext.Provider value={{state , update}}>
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}




export default NoteState