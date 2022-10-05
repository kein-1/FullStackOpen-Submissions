const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]


app.get('/', (request,response) => {
    response.send('<h1>Hello world!dsadasd!!</h1>')
})


app.get('/api/notes/:id', (request, response) => {
    console.log(request.params)
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    note ? response.json(note) : response.status(404).end()
  })

app.get('/api/notes', (request,response) => {
    response.json(notes)
    } 
)

app.get('/foobar', (request,response) => {
    response.send('<h1>Hello fool!!</h1>')
})
  


app.post('/api/notes',(request,response) => {
    const note = request.body

    if (!note.content){
        return response.status(404).json("ERROR MISSING CONTENT")
    }

    const newNote = {
        "content": note.content,
        "important": note.important || false,
        "id": 10,
        "date": new Date()
    }
    notes = [...notes,newNote]

    console.log(notes)
    response.json(notes)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})