import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState(null)

  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")  // fetch backend 
    .then((res)=>{
      setNotes(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handlerSubmit(e){
    e.preventDefault()
    const {title,description} = e.target.elements;
    
    console.log(title.value,description.value);

    axios.post("http://localhost:3000/api/notes",{
      title : title.value,
      description : description.value
    })
    .then((res)=>{
      console.log(res.data);

      fetchNotes()
    })
    
  }

  function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(()=>{
      fetchNotes()
    })
  }

  function handleNoteUpdate(e){
    e.preventDefault()
    axios.put("http://localhost:3000/api/notes/"+editNote._id,{
      title:editNote.title,
      description:editNote.description
    })
    .then(()=>{
      setEditNote(null);
      fetchNotes()
    })
  }

  return (
    <>

      <form className='create-form' onSubmit={handlerSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button className='create-btn'>Create Note</button>
      </form>

      {editNote && 
        <form className='update-form' onSubmit={(e)=>{
          handleNoteUpdate(e)
        }}>
          <input
            type="text"
            value={editNote.title}
            onChange={(e) =>
              setEditNote({ ...editNote, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editNote.description}
            onChange={(e) =>
              setEditNote({ ...editNote, description: e.target.value })
            }
          />
           <button className='update-btn' type="submit">Update</button>
           <button className='delete-btn' type="button" onClick={()=>{
            setEditNote(null)
           }}>Cancel</button>
        </form>
      }

      <div className="notes">
        {notes.map((note)=>{
          return <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button className='delete-btn' onClick={()=>{
              handleDeleteNote(note._id);
            }}>delete</button>
            <button className='update-btn' onClick={()=>{
              setEditNote(note);
            }}>update</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App