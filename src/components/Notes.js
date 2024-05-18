import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import "../css/style.css" 

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes,getAllNotes, editNote } = context;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [searchedQuery, setSearchedQuery] = useState('');



    const handleSearchSubmit = (term) => {
        const filterNotes = notes.filter(note => 
            note.title.toLowerCase().includes(term.toLowerCase()) || 
            note.description.toLowerCase().includes(term.toLowerCase()) || 
            note.tag.toLowerCase().includes(term.toLowerCase())
        );
        
        setFilteredNotes(filterNotes);
        setSearchedQuery(term);
        setSearchTerm('');
    }
    
    
    const changeSearch = (e) =>{
        setSearchTerm(e.target.value);
    }

    // sort the notes
    notes.sort((a, b) => a.title.localeCompare(b.title));

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            navigate('/login');
        }
    }, [editNote]);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "",efile:""})


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag,efile:currentNote.file})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag,note.efile)
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");     

    }

    const onChange = (e) => {
        // If the changed element is the file input, set the file state
        if (e.target.name === 'efile') {
            setNote({ ...note, [e.target.name]: e.target.files[0] });
        } else {
            // Otherwise, set other form fields
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">File</label>
                                    <input accept='.pdf' type="file" className="form-control" id="efile" name="efile" onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="button btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="button btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Parent">
                <h1>NOTES</h1>
                <div className="search-button-container">
                    
                    <form onSubmit={(e)=>{e.preventDefault(); handleSearchSubmit(searchTerm)}} id="search-form">
                        <input onChange={changeSearch} value={searchTerm} type="text" id='search' placeholder='Search note...' name='search' autoComplete='off' />
                        <i className="icon fa-solid fa-magnifying-glass"></i>
                    </form>
                </div>
                <div className="container mx-2" style={{width:'100%'}}> 
                </div>
                <div className="main">
                    {searchedQuery ? (
                            // Render filtered notes if there is a search query
                            <>
                                {filteredNotes.length === 0 ? (
                                    <p>No notes to display</p>
                                ) : (
                                    filteredNotes.map(note => (
                                        <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                                    ))
                                )}
                            </>
                        ) : (
                            // Render all notes if there is no search query
                            <>
                                {notes.length === 0 ? (
                                    <p>No notes to display</p>
                                ) : (
                                    notes.map(note => (
                                        <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                                    ))
                                )}
                            </>
                        )}
                </div>
            </div>
        </>
    )
}

export default Notes
