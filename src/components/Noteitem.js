import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const showPdf = (pdf)=>{
        window.open(`http://localhost:5000/uploads/${pdf}`,"_blank","noreferrer")
    }
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        <button className='button btn btn-primary' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem