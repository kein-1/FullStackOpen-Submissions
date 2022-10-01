import { useState,useEffect } from 'react'
import axios from 'axios'
import { getAll, createPerson, deletePerson, changeNumber } from './services/phonebook.js'


const Person = (props) => {
  const {name,number,id,del} = props

  console.log(del)
  console.log(typeof(del))
  return (
    
    <li>{name} {number} 
    <button onClick={del}> delete </button>
    </li>
  )
}


const DisplayPeople = props => {

  //Props is passed in as an object. its keys are persons and filterName 
  const {persons,filterName, setPersons, setErrorMessage} = props


  const deleteFunction = (name, id) => {
    deletePerson(name,id).then
    (response => {
      console.log(response)
      console.log(typeof(response))
      getAll().then( response => setPersons(response.data))
    }).catch( response => {
      setErrorMessage("ERROR PERSON WAS ALREADY GONE")

    }
    )
  }
  
  
  if (filterName === ""){
    //The filter status is empty so just print everything 
    return (
      <div>
      {
        persons.map(element => <Person key={element.id} {...element} del={ () => deleteFunction(element.name,element.id)} />)
      }
      </div>
    )
  }
  else{
    //Filter input is not empty so we we want to display filtered elements
    const str = filterName[0].toUpperCase() + filterName.slice(1)
    const arr = persons.filter(element => element.name.includes(str))
    return (
      <div>
      {
        arr.map(element => <Person key={element.id} {...element} del={ () => deleteFunction(element.name,element.id)} />)
      }
      </div>
    )
  }

}


const PersonForm = (props) => {
  // <PersonForm name={newName} number={newNumber} personName={personName} personNumber={personNumber} addPerson={addPerson}/>
  const {newName, newNumber, personName, personNumber, addPerson} = props
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value= {newName} onChange={personName}/>
        phone number: <input value= {newNumber} onChange={personNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = props => {

  const {filterName, filterValue} = props
  //so instead of props.filterName and props.filterValue, we can just use fitlerName since when we destructure we are assigning using
  //the keys itself to now access the value 

  return (
    <div>
      filter people by name: <input value={filterName} onChange={filterValue}/>
    </div>
  )

}

const AddMessage = (props) => {
  const {addMessage} = props

  if (addMessage === null){
    return
  }
  return (
    <div className='error'>
      {addMessage}
    </div>
  )

}

const App = () => {

  //Use useState to track our current phonebook and each input value's values. We run a function each time to update the current state's values
  //for that input and then we can use those values to either add to our phonebook array or to filter 

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filterName, setFilterName] = useState("")
  const [addedMessage, setAddedMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // This is ran in the input field. Each time the value in the input changes, the current state is changed to it
  const personName = (e) => setNewName(e.target.value)
  const personNumber = (e) => setNewNumber(e.target.value)
  const filterValue = (e) => setFilterName(e.target.value)

  // This is where we add a new person to our array of people. We get the value of the current state newName and make it into a new object
  // Then we concat this value with newPerson to create a new array as this is the recommended way for no errors in the code
  // Finally we reset the name state to an empty string
  
  
  useEffect( () => {
    getAll().then(
      response => {
        console.log("use effect ran")
        setPersons(response.data)
      }
    )
  },[])

  const addPerson = (e) => {

    e.preventDefault()

    // Checks if we already have the name in our list. If we do not have the name, the method returns "undefined"
    // Hence, we make a new object and add to our phonebook if so
    let duplicate = persons.find(element => element.name === newName)

    //Make a new person and update the database entirely 
    if (duplicate != undefined){
      if (window.confirm(`${newName} already exists in your phonebook! Replace old number with new one?`)){

        const person = persons.find(element => element.name === newName)
        const personID = person.id
        const newPerson = {...person, number: newNumber}
        
        
        changeNumber(newPerson,personID).then(response => {
          console.log("this is the response", response) 
          
          // Here we must update the current state array. We check if our current element's ID is equal to 
          // the new object we created/modified. If so, we return the response.data, which is the object returned
          // to us when we successfully modified the backend element 
          // otherwise, we just copy over the same element 
          // this is important since remember in React, we must never directly update the state. We should make a 
          // new array and set that to our current state. the 'map' method makes a new array 
          setPersons(persons.map(element => element.id === newPerson.id ? response.data : element))
          setNewName("")
          setNewNumber(0)
          setAddedMessage(`Added ${newPerson.name}`)
          setTimeout( () => setAddedMessage(null),3000)
          }
        )
      }
    }
    else{

      //Creates a new person object and sets its values equal to the state values
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      const newPersonsArr = persons.concat(newPerson)
      setPersons(newPersonsArr)
      
      createPerson(newPerson).then(response=>{
        console.log(response.data)
      })

      setNewName("")
      setNewNumber(0)
      setAddedMessage(`Added ${newPerson.name}`)
      setTimeout( () => setAddedMessage(null),3000)


    }
  }

  //In DisplayPeople, we are passing the current state of the filter input value. In the component, we either display all the values
  //if the current state is an empty string (aka no filters) or filter based on whatever is typed in

  console.log("I am rendered again!")
  return (
    <div>
      <h2>Phonebook</h2>
      <AddMessage addMessage = {addedMessage} />
      <p>{errorMessage}</p>
      <Filter filterName={filterName} filterValue={filterValue}/>
      <h3>Add a new person</h3>
      <PersonForm newName={newName} newNumber={newNumber} personName={personName} personNumber={personNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
        <DisplayPeople persons={persons} filterName = {filterName} setPersons = {setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App


