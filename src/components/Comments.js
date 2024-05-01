import React from 'react'
function Comments({comments}) {
    return (
        <div>
      <h1>Note Page</h1>
      <h2>Comments for Note</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <p>Posted by: {comment.postedBy}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments
