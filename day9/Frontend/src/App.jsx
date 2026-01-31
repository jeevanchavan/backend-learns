import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
  

  return (
    <div className="notes">
      {notes.map((note)=>{
        return <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
      })}
    </div>
  )
}

export default App