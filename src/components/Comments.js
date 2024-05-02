import React from 'react'
import '../css/style.css';

function Comments({toggleComments,comments,show}) {
    return (
      <div className="parent-comment">
        <div className={`comment-container my-3 comments ${show ? 'visible' : ''}`}>
          <i onClick={()=>{toggleComments()}} class="fa-solid fa-xmark"></i>
          {comments.map(comment => (
            <div key={comment.id} className="comment-section">
              <span>{comment.postedBy}</span><span>:</span> &nbsp;&nbsp;
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Comments
