
import React from 'react'
import ReactDOM from 'react-dom/client'

const Course = (props) => {

    const {name,id,parts} = props
    console.log(parts)
    //Sum the exercises using the reduce method. curr is each ELEMENT in the array. prev is the previously
    //returned value. We start with 0 
    const total = parts.reduce((prev,curr) => (prev + curr.exercises),0)
    console.log(total)
    return (
      <div>
        <h1>{name}</h1>
        {
          parts.map(element => <li key={element.id}>{element.name} {element.exercises}</li>)
        }
        <h3>total of {total} exercises </h3>
      </div>
    )
  
  }

export default Course