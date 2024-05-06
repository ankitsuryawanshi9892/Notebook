import React, { useContext } from 'react'
import '../css/style.css';
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';


function Comments({noteId,toggleComments,comments,show}) {
      const context = useContext(noteContext)
      const {getTimeDifference} = context;
    return (
      <div className="parent-comment">
        <div className={`comment-container my-3 comments ${show ? 'visible' : ''}`}>
          <span></span>
          <i onClick={()=>{toggleComments()}} className="fa-solid fa-xmark"></i>
          {comments.map(comment => (
            <div key={comment._id} className="comment-section">
              <span>{comment.postedBy}</span><span>:</span> &nbsp;&nbsp;
              <p>{comment.text}</p>
              <span className='time'>{getTimeDifference(comment.timestamp)}</span>:
              
            </div>
          ))}
        </div>
      </div>
  )
}

export default Comments
