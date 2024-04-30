import NoteContext from "./noteContext";
import axios from "axios";
import { useState } from "react";

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

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Add a Comment
const addComment = async (noteId, commentText) => {
  try {
    // API Call
    const response = await fetch(`${host}/api/notes/addcomment/${noteId}`, {
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

    const newComment = await response.json();
    
    // Assuming notes is a state variable holding all notes
    const updatedNotes = notes.map(note => {
      if (note._id === noteId) {
        return {
          ...note,
          comments: [...note.comments, newComment]
        };
      }
      return note;
    });

    setNotes(updatedNotes);
  } catch (error) {
    console.error('Error adding comment:', error);
    // Handle error, perhaps display a message to the user
  }
}



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;