import React, { useContext,useState,useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/profile.css'
import '../css/style.css'
import '../css/noteslist.css'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
const ImageUpload = (props) => {
    let navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // To display uploaded image
    const [name, setname] = useState(null);
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [profession, setprofession] = useState(null);
    const host = "http://localhost:5000";
    // Function to fetch user data including avatar URL
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "",efile:""})
    const fetchUserData = async () => {
        try {
            // Fetch user data including avatar URL
            const response = await axios.get(`${host}/api/auth/getuser`, {
                headers: {
                    'auth-token': localStorage.getItem('token') // Include auth token
                }
            });
            if (response.data && response.data.avatar) {
                setname(response.data.name);
                setImageUrl(response.data.avatar);
                setprofession(response.data.profession);
            }
        } catch (error) {
            console.error(error.message);
            // Handle error gracefully
        }
    };

    const onChange = (e) => {
        // If the changed element is the file input, set the file state
        if (e.target.name === 'efile') {
            setNote({ ...note, [e.target.name]: e.target.files[0] });
        } else {
            // Otherwise, set other form fields
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    };

    
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('avatar', selectedImage);
        
        try {
            const response = await axios.post(`${host}/api/auth/upload-avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                    'auth-token': localStorage.getItem('token') // Include auth token
                }
            });

            setImageUrl(response.data.user.avatar); // Update the image URL for display
        } catch (error) {
            console.error(error.message);
            // Handle upload errors gracefully
        }
    };

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag,efile:currentNote.file})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag,note.efile)
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");     

    }


    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        }
        else{
            navigate('/login');
        }
    }, [editNote])

    // Fetch user data including avatar URL on component mount
    useEffect(() => {
        fetchUserData();
    }, [handleUpload]);

    return (

        <div className="main">
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
            <div className='container'>
                <div className='profession'>
                    <h4>{name}</h4>
                    <h4>{profession}</h4>
                </div>
                <div className="profile">
                    {/* Dynamically set the image source */}
                    {imageUrl ? (
                    <img src={imageUrl} alt="Uploaded avatar" />
                    ) : (
                    <img src="images/user.png" alt="Default avatar" />
                    )}
                    <br />
                    <input className='my-1' type="file" accept='.jpg' onChange={handleImageChange} /><br></br>
                    <button className='button my-3' onClick={handleUpload}>Upload Image</button>
                </div>
            </div>
            <div className="row my-3 notesContainer">
                <h2>Your Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem showAlert = {props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    );
};

export default ImageUpload;
