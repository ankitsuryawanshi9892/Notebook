import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import { useState,useEffect } from 'react'

const Noteitem = (props) => {
    const showPdf = (pdf)=>{
        window.open(`http://localhost:5000/uploads/${pdf}`,"_blank","noreferrer")
    }
    const host = "http://localhost:5000"
    const [comment, setComment] = useState("")
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [isLiked, setisLiked] = useState(false)
    const [count, setcount] = useState(0)
    const [isComment, setisComment] = useState(false);
    const [data, setdata] = useState("")
    const [heading, setheading] = useState(false);
    const commentChange = (event) => {
        setComment(event.target.value);
    };

    
        // Add a Comment
    const addComment = async (noteId, commentText) => {
        // event.preventDefault();
        console.log(noteId,commentText);
        try {
        // API Call
        const response = await fetch(`${host}/api/notes/comment/${noteId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ text: commentText })
        });
        
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        setisComment(true);
        setdata(comment);
        setheading(true);
        setComment('');
    }    catch(error){
        console.log(error);
    }    
    }
    
  

    useEffect(() => {
        
          const timer = setTimeout(() => {
            setheading(false);
          }, 2000);
    
          return () => clearTimeout(timer);
        
      }, [isComment]);
    
    const handleLike = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/notes/${isLiked ? 'unlike' : 'like'}/${note._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Include your authentication token here if needed
                },
                // body: JSON.stringify({}) // You can include data in the body if required by your backend
            });
            if (res.ok) {
                // const updatedNote = await res.json();
                setisLiked(!isLiked);
            } else {
                console.error('Failed to like/unlike note:', res.statusText);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        // Fetch initial like status of the note when component mounts
        const fetchLikeStatus = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/notes/isliked/${note._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });
                if (res.ok) {
                    const { isLiked,note } = await res.json();
                    setisLiked(isLiked);
                    setcount(note.likes.length)
                } else {
                    console.error('Failed to fetch like status:', res.statusText);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchLikeStatus();
    }, [note._id,handleLike]); // Only run this effect when note._id changes


    const [dropdown, setdropdown] = useState(false)
    const handleDropdown=()=>{
        setdropdown(!dropdown);
    }

    const handleClickOutside = (event) => {
        // Check if the click event originated from outside the dropdown or the three dots icon
        if (!event.target.closest(".del-up") && !event.target.closest(".fa-ellipsis-vertical")) {
            setdropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        // Clean up the event listeners when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);



    return (
        <>
        <div className="boxes">
            <div className="title-icons">
                <div className="title">
                    <h5>{note.title}</h5>
                </div>
                <div className="icons">
                {!isLiked ? (
                    <i className='fa-regular fa-heart mx-2' onClick={() => handleLike(note._id)}></i>
                ) : (
                    <i className='fa-solid fa-heart mx-2' onClick={() => handleLike(note._id)}></i>
                )}
                    <span className='like-count'>{count}</span>
                    <button className='button btn item' onClick={()=>showPdf(note.file.filename)}>Show Pdf</button>
                    <i className="fa-solid fa-ellipsis-vertical mx-2" onClick={handleDropdown}></i>
                    {dropdown && <div className="del-up mx-6">
                        <i className="far fa-trash-alt mx-2 item" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2 item" onClick={()=>{updateNote(note)}}></i>
                    </div>}
                </div>
            </div>
            <p>{note.date.split("T")[0]}</p>
            <div className="scrollable-content">
                <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas minus dolorem rerum, aliquid nam accusamus illum neque, placeat saepe doloribus sit laboriosam ab, similique ipsum iste. Ea eaque officiis laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, praesentium nisi cupiditate ipsa molestias atque ex est error quaerat ratione recusandae asperiores eaque tempore eligendi quibusdam nesciunt aspernatur cum modi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum iste asperiores vero aut ab, voluptatem quod dolor voluptas. Aliquam ipsam labore exercitationem enim blanditiis explicabo reprehenderit iusto inventore nam sint.</p>
            </div>
            <div className="comment">
                <form>
                    <input
                    type="text"
                    name="comment"
                    value={comment}
                    placeholder="Add a comment"
                    onChange={commentChange}
                    />
                    {/* <button onClick={handleCommentSubmit} type="submit">Submit</button> */}
                    <i className="fa-solid fa-arrow-right-from-bracket mx-2" style={{fontSize:"20px"}} onClick={()=>{addComment(note._id,comment)}}></i>
                </form>
            </div>
            {/* <div className="comment-added">
                {isComment?<h4>Comment Added...</h4> <p>data</p>:""}
            </div> */}
            {isComment ? (
                <div>
                    {heading && <h6>Comment Added...</h6>}
                    <p>{data}</p>
                </div>
                ) : null}
        </div>
        </>
    )
}

export default Noteitem