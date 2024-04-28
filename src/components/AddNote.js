import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import axios from 'axios'; // Import Axios for making HTTP requests
import '../css/style.css';

const AddNote = ({ toggleAddNote, show }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "", file: null }); // Add file state
    const host = "http://localhost:5000"
    const handleClick = async (e) => {
        e.preventDefault();        
        addNote(note.title,note.description,note.tag,note.file);
        setNote({ title: "", description: "", tag: "", file: null });
        toggleAddNote();
    };

    const onChange = (e) => {
        // If the changed element is the file input, set the file state
        if (e.target.name === 'file') {
            setNote({ ...note, [e.target.name]: e.target.files[0] });
        } else {
            // Otherwise, set other form fields
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };


    return (
        <div className={`form-container-addnote my-3 ${show ? 'visible' : ''}`}>
            <div className="form-head">
                <h2>Add a Note</h2>
                <i onClick={()=>{toggleAddNote()}} className="fa-solid fa-square-xmark"></i>
            </div>
            <form className="my-3" id='uploadform'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}  minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" id="tag" name="tag" value={note.tag} minLength={5} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">File:</label>
                    <input type="file" accept=".pdf" id="file" name="file" onChange={onChange} required />
                </div>
                <span className="tooltip">
                    <button
                        disabled={note.title.length < 5 || note.description.length < 5 || !note.file}
                        type="submit"
                        className="btn btn-primary button"
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
                    <span className="tooltiptext">
                        {note.title.length < 5 || note.description.length < 5 || !note.file ? "Fill Required Fields" : ""}
                    </span>
                </span>
            </form>
        </div>
    );
};

export default AddNote;
