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
        <>
        <div className="boxes">
            <div className="title-icons">
                <div className="title">
                    <h5>{note.title}</h5>
                </div>
                <div className="icons">
                    <i className="far fa-trash-alt mx-2 item" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2 item" onClick={()=>{updateNote(note)}}></i>
                    <button className='button btn item' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                </div>
            </div>
            <p>{note.date.split("T")[0]}</p>
            <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum iste asperiores vero aut ab, voluptatem quod dolor voluptas. Aliquam ipsam labore exercitationem enim blanditiis explicabo reprehenderit iusto inventore nam sint.</p>
        </div>
        <div className="boxes">
            <div className="title-icons">
                <div className="title">
                    <h5>{note.title}</h5>
                </div>
                <div className="icons">
                    <i className="far fa-trash-alt mx-2 item" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2 item" onClick={()=>{updateNote(note)}}></i>
                    <button className='button btn item' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                </div>
            </div>
            <p>{note.date.split("T")[0]}</p>
            <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum iste asperiores vero aut ab, voluptatem quod dolor voluptas. Aliquam ipsam labore exercitationem enim blanditiis explicabo reprehenderit iusto inventore nam sint.</p>
        </div>
        <div className="boxes">
            <div className="title-icons">
                <div className="title">
                    <h5>{note.title}</h5>
                </div>
                <div className="icons">
                    <i className="far fa-trash-alt mx-2 item" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2 item" onClick={()=>{updateNote(note)}}></i>
                    <button className='button btn item' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                </div>
            </div>
            <p>{note.date.split("T")[0]}</p>
            <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum iste asperiores vero aut ab, voluptatem quod dolor voluptas. Aliquam ipsam labore exercitationem enim blanditiis explicabo reprehenderit iusto inventore nam sint.</p>
        </div>
        </>
    )
}

export default Noteitem