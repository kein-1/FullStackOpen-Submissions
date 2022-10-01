import Notes from './Notes'
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setnewNote] = useState("")
  const [showNotes, setShowNotes] = useState(true)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    axios.put(url, changedNote).then(response => {
      console.log(response.data)
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setnewNote("")
    })
  }

  const changeNote = (e) => {
    setnewNote(e.target.value)

  }

  const showBtn = () => {
    setShowNotes(!showNotes)  
  }
  

  const notesToShow = showNotes ? notes : notes.filter(element => element.important === true)
  return (  
    <div>
      <h1>Notes</h1>
      <button onClick={showBtn}>Show All!</button>
      <ul>
        {notesToShow.map(note => 
          <Notes key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>

      <form onSubmit={addNote}>
          <input value = {newNote} onChange={changeNote}/>
          <button type="submit">submit!</button>
      </form> 
    </div>
  )
}

export default App