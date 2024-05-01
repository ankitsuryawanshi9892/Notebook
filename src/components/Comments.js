import React from 'react'
import '../css/style.css';

function Comments({comments,show}) {
    return (
        <div className={`comment-container my-3 comments ${show ? 'visible' : ''}`}>
      {comments.map(comment => (
        <div key={comment.id} className="comment-section">
          <span>{comment.postedBy}</span><span>:</span> &nbsp;&nbsp;
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments
