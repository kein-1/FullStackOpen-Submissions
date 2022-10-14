
//Goal here is to connect this back-end server we built in phonebook, part3, with our front-end server we built in phonebook, part2.
//Backend here is built with Express. So we need to use 'npm install cors' for it to connect because react is on port 3000 while express is on port 3001
//Know the difference between axios and express.. i feel like express is the warehouse that setsup all the routing and handles what to do when we get a certain request. 
//Axios is used to send those requests themselves 
require("dotenv").config()
const express = require('express')
const cors = require('cors') //define a cors object 
const morgan = require('morgan') //morgan is a logging tool. helps letting you know how your http requests/responses are 
const app = express()
const mongoose = require('mongoose')

//Exported from the model.js file which has all the logic for database stuff
const {Person,connect} = require('./model.js')


//This is added using process.env. Process variables can be made using the dotenv package. It is useful to be used for things sucqh as API keys. (separate video on that)
//Here, we are specifying the PORT variable as a process.env.PORT. This is needed because when we host our website, sites like Heroku/Render automatically assign a value to the PORT variable. The code below will default to PORT 3001 if we don't have a process.env variable PORT
const PORT = process.env.PORT || 3001


//Middlware functions here 
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))
app.set("json spaces", 2)

connect()

//To test these HTTP requests, we can use Postman or use VSCode's REST module which I did here. I made it in the requests' folder 

app.get('/api/persons', (request,response) => {

    try{
      const get_All = async () => {
        const results = await Person.find({})
        response.json(results)
      }
      console.log("this ran in get page")
      get_All()
      // mongoose.connection.close()z
    }
    catch (error) {
      console.log(error)
      response.status(404).end()
    }
})

app.get('/api/persons/:id', (request,response,next) => {

	const get_person = async () => {
		try{
			let ans = await Person.findById(request.params.id)
			response.send(ans)
		}
		catch(error) {
			next(error)
		}
	}
	get_person()
})



app.delete('/api/persons/:id', (request,response,next) => {

	const delete_perseon = async () => {
		try{
			const deletion = request.params.id
			console.log(deletion)
			let ans = await Person.findByIdAndDelete(deletion)
			console.log(`deleted ${deletion} from the book. The count of deletion was ${ans}`)
			response.status(204).end()
			
		}
		catch(error) {
			next(error)
		}
	}
	delete_perseon()
})


//Post method did not seem to work if I did not provide a response data

app.post('/api/persons', (request,response,next) => {

    //.body is a parameter of the request object. It is basically the content that was passed into it 
    const body = request.body

    //Basically if the body info is empty, we send an error
    if (!body.name || !body.number){
        return response.status(404).send("Empty parameters!!!")
    }

    const add = async () => {
		try{
			connect()
			console.log(body.name)
			console.log(body.number)
			let numb = Number(body.numb)
			console.log(typeof(numb))

			const new_entry = new Person({
				name: body.name,
				number: numb
			})
			await new_entry.save()
			response.json(new_entry)
		}
		catch(error){
			next(error)
		}
      
    }

    add()
})

//Express error handling middleware must be created after routes and other middleware because middelware is called in the order they are defined. If this is placed at the top, it will never run
//We use the next() and pass error as a parameter : 'next(error)'
//We do this in our routes since routes have a next parameter (but usallly omitted). The next parameter means call the next middelware function.
//Technically everything inside our routes are considered middelware hence the next() 

app.put('/api/persons/:id', (request,response,next) => {

	const content = request.body
	const id = request.params.id
	console.log(content)
	console.log(id)
	const update_numb = async () => {
		try{
			const person = await Person.findById(id)
			console.log(person)
			person.number = content.number
			person.save()
			console.log("UPDATED")
			response.end()
		}catch(error){
			console.log("in erorr mrsg")
			console.log(error)
			next(error)
		}
	}
	update_numb()


})


//This is the error middleware. ERROR is the error resposne we sent back
//When we send back the response to the client, the front end gets the whole error response. If we console log the error, it has a lot of different fields.
//It has a response field, which consists of the json data we send back below. 
//We are sending back error message which tells us WHAT the error was 
app.use((error, request, response, next) => {
	console.log(error)
	console.log(error.message)
	console.log(error.value)
	return response.status(500).json({error:error.message})
})


app.listen(PORT, () => {
    console.log(`running on ${PORT} server`)
})

