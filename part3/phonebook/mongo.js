const mongoose = require('mongoose')

//Process.argv is the command line arguments 

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://tensaikev:${password}@cluster0.cyp8it5.mongodb.net/noteApp?retryWrites=true&w=majority`

//Defines the schema for how we want our document object to look 
const entry = mongoose.Schema({
    name: String,
    number: Number,
})

//First argument is the collection name. The 2nd is we pass in the schema. This creates 
//a Person object, which is a Model. We then use this to create instances of the model
//We will be using this Person object to add and perform queries on type Person in our database  
const Person = mongoose.model('phonebook',entry)

const connect = async () => {
    try{
        mongoose.connect(url)
        console.log("Success!")
    }
    catch (error) {
        console.log(error)
    }
}

const add = async () => {

    const new_entry = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    await new_entry.save()
    console.log(`added ${new_entry.name} number ${new_entry.number} to phonebook `)
    mongoose.connection.close()
}

if (process.argv.length === 3){
    connect()
    const search = async () => {
        const response = await Person.find({})
        console.log(response)
        console.log("phonebook:")
        response.forEach(element => {
            console.log(`${element.name} ${element.number}`)
        })
    }
    search()
    mongoose.connection.close()
}

if (process.argv.length == 5){
    connect()
    add()
}