require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const entry = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
    },
    number: {
        type: Number,
        minLength: 8,
        validate: {
            validator: function(v) {
              return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{6}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
    }
})

//First argument is the collection name. The 2nd is we pass in the schema. This creates 
//a Person object, which is a Model. We then use this to create instances of the model
//We will be using this Person object to add and perform queries on type Person in our database  
const Person = mongoose.model('phonebook',entry)


const connect = async () => {
    try{
        const response = await mongoose.connect(url)
        console.log("Success!")
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {
    Person,
    connect
}