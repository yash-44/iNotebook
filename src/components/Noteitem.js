// import React from 'react' //(rfce)
import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'


function Noteitem(props) {
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    const deleteNotes = () => {
        deleteNote(note._id)
        props.showAlert("Deleted Successfully","success")
    }

    return (
        <div className='col-md-3'>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} <span> </span> {note.tag}</p>
                    <p className="card-text"></p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={deleteNotes}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
