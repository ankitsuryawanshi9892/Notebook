import React from 'react'
import '../css/style.css'
function Alert(props) {
  const capitalize = (word)=>{
        if (!word) return ""; 
        if(word==="danger"){
          word = 'error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
    <div className="alert-container">
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong className='strong'>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
    )
}

export default Alert