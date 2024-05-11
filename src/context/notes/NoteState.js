import NoteContext from "./noteContext";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get user specific Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  // Get all Notes
  const getAllNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnoteswithoutid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  const fetchUserData = async () => {
    try {
        // Fetch user data including avatar URL
        const response = await axios.get(`${host}/api/auth/getuser`, {
            headers: {
                'auth-token': localStorage.getItem('token') // Include auth token
            }
        });
        
        return response.data;
    } catch (error) {
        console.error(error.message);
        // Handle error gracefully
    }
};


 // Add a Note
  const addNote = async (title, description, tag,file) => {
      const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tag', tag);
        formData.append('file', file); // Append file to FormData

        try {
            // Make HTTP POST request to backend
            const response = await axios.post(`${host}/api/notes/addnote`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type header for FormData
                    "auth-token": localStorage.getItem('token')
                }
            });
            // Handle successful response
            console.log('Note added:', response.data);
            // Reset form state after successful submission
            setNotes([...notes, response.data]);
        } catch (error) {
            // Handle error
            console.error('Error adding note:', error);
        }

  }

  // // Edit a Note
  const editNote = async (id, title, description, tag, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tag', tag);
    formData.append('file', file); // Append file to FormData

    try {
        // Make HTTP PUT request to backend
        const response = await axios.put(`${host}/api/notes/updatenote/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type header for FormData
                "auth-token": localStorage.getItem('token')
            }
        });
        // Handle successful response
        console.log('Note updated:', response.data);

        // Logic to update in client state
        const updatedNotes = notes.map((note) => {
            if (note._id === id) {
                return { ...note, title, description, tag, file };
            }
            return note;
        });
        setNotes(updatedNotes);
    } catch (error) {
        // Handle error
        console.error('Error updating note:', error);
    }
}

const deleteNote = async (id) => {
  try {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

    if (response.status === 401) {
      // Show alert using SweetAlert2 if user is not allowed
      Swal.fire({
        icon: 'error',
        title: 'Not Allowed',
        text: 'You are not allowed to delete this note.',
      });
      return;
    }

    const json = await response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  } catch (error) {
    console.error(error);
    // Handle other errors as needed
  }
}


  const getAllComments = async (id) => {
    try {
        const response = await fetch(`${host}/api/notes/viewComments/${id}`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json(); 
        return json.note.comments; // Return the array of comments

    } catch (error) {
        console.error("Error fetching comments:", error);
        // Handle error
        return []; // Return an empty array in case of error
    }
}

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
    return `${months} mon ago`;
  } else if (weeks > 0) {
    return `${weeks} w ago`;
  } else if (days > 0) {
    return `${days} d ago`;
  } else if (hours > 0) {
    return `${hours} h ago`;
  } else {
    return `${minutes} min ago`;
  }
};



return (
    <NoteContext.Provider value={{fetchUserData, getTimeDifference, notes, addNote, deleteNote, editNote, getNotes,getAllNotes,getAllComments }}>
      {props.children}
    </NoteContext.Provider>
  )
}

// Add a Comment
// const addComment = async (noteId, commentText) => {
//   try {
//     // API Call
//     const response = await fetch(`${host}/api/notes/addcomment/${noteId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": localStorage.getItem('token')
//       },
//       body: JSON.stringify({ text: commentText })
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to add comment');
//     }

//     const newComment = await response.json();
  
//     // Assuming notes is a state variable holding all notes
//     const updatedNotes = notes.map(note => {
//       if (note._id === noteId) {
//         return {
//           ...note,
//           comments: [...note.comments, newComment]
//         };
//       }
//       return note;
//     });

//     setNotes(updatedNotes);
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     // Handle error, perhaps display a message to the user
//   }
// }




export default NoteState;