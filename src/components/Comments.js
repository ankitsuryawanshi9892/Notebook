import React from 'react'
import '../css/style.css';

function Comments({noteId,toggleComments,comments,show}) {
    
    return (
      <div className="parent-comment">
        <div className={`comment-container my-3 comments ${show ? 'visible' : ''}`}>
          <span></span>
          <i onClick={()=>{toggleComments()}} className="fa-solid fa-xmark"></i>
          {comments.map(comment => (
            <div key={comment._id} className="comment-section">
              <span>{comment.postedBy}</span><span>:</span> &nbsp;&nbsp;
              <p>{comment.text}</p><span className='time'>3w ago</span>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Comments
