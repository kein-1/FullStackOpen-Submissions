
//Goal here is to connect this back-end server we built in phonebook, part3, with our front-end server we built in phonebook, part2.
//Backend here is built with Express. So we need to use 'npm install cors' for it to connect because react is on port 3000 while express is on port 3001
//Know the difference between axios and express.. i feel like express is the warehouse that setsup all the routing and handles what to do when we get a certain request. 
//Axios is used to send those requests themselves 


const express = require('express')
const cors = require('cors') //define a cors object 
const morgan = require('morgan') //morgan is a logging tool. helps letting you know how your http requests/responses are 
const app = express()
const PORT = process.env.PORT || 3001




//Middlware functions here 
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))




//Calling the middleware here. Define requestLogger as a function since in JavaScript, arrow functions are defined when they get to their line whereas functions are hoisted to the top of the scope 
let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//To test these HTTP requests, we can use Postman or use VSCode's REST module which I did here. I made it in the requests' folder 

app.get('/api/persons', (request,response) => {

    console.log("this ran in get page")
    response.json(data)

})



app.get('/info', (request,response) => {
    
    const date = new Date().toString()
    const length = data.length

    //Response.send() and Response.json() is very similar but if the item passed into send() is a string, it will be processed as text/html
    //whereas response.json() turns it into a javascript object 
    response.send(`<h2>Phonebook has info for ${length} people <\h2> \n ${date}`)

})


app.get('/api/persons/:id', (request,response) => {


    const id = Number(request.params.id) 
    const person = data.find(element => element.id === id)
    person === undefined ? response.status(404).send("Person not found"): response.json(person)

})

app.delete('/api/persons/:id', (request,response) => {

    const id = Number(request.params.id) 

    const person = data.find(element => element.id === id)

    person === undefined ? response.status(404).send("Person not found") : 
      
    data = data.filter(element => element.id !== id)
    response.status(204).send("Person deleted")
})


//Post method did not seem to work if I did not provide a response data

app.post('/api/persons', (request,response) => {

    //.body is a parameter of the request object. It is basically the content that was passed into it 
    const body = request.body

    //Basically if the body info is empty, we send an error
    if (!body.name || !body.number){
        return response.status(404).send("Empty parameters!!!")
    }

    const exists = data.find(element=> element.name === body.name)

    if (exists !== undefined){
        return response.status(404).send("Name already exists!")
    }

    //Generate a random id
    const id = Math.floor(Math.random() * 1000)
    console.log(id)

    const newEntry = {
        "id": id,
        "name": body.name,
        "number": body.number
    }

    //Copies the data into the new array with spread syntax
    //Could have also used the concat method 
    data = [...data, newEntry]
    response.json(data)


    
})


app.listen(PORT, () => {
    console.log(`running on ${PORT} server`)
})

