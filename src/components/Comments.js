import React from 'react'
import '../css/style.css';
import { useEffect } from 'react';


function Comments({noteId,toggleComments,comments,show}) {
    // Function to calculate time difference
    const getTimeDifference = (timestamp) => {
        
      
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const difference = Math.abs(currentTime - commentTime);

        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
          return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
      };

  
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
