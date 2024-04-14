import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import "../css/noteslist.css" 

const Noteitem = (props) => {
    const showPdf = (pdf)=>{
        window.open(`http://localhost:5000/uploads/${pdf}`,"_blank","noreferrer")
    }
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3 note-item">
            <div className="card my-3">
                <div className="card-body parent">
                    <div className="title">
                        <h5 className="item">{note.title}</h5>
                    </div>
                    <div className="icons-buttons">
                    <div className="d-flex align-items-center icons">
                        <i className="far fa-trash-alt mx-2 item" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2 item" onClick={()=>{updateNote(note)}}></i>
                        <button className='button btn btn-primary item' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                    </div>
                    </div>
                </div>
                    <p className="card-text desc">{note.description}</p>

            </div>
        </div>
    )
}

export default Noteitem