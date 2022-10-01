import { useState } from 'react'


const Button = props => {

  const {clickFunction, text} = props
  return <button onClick = {clickFunction}>{text}</button>
}


const Display = props => {
  
  const {text} = props
  return <h3>{text}</h3>
}


const DisplayVotes = props => {
  
  const {votes} = props
  return <h3>This anecdote has : {votes} votes</h3>
}

const DisplayMost = props => {
  const {text,votes} = props
  return <h3>{text}. has {votes}</h3>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...Array(7).fill(0)])

  const clickFunction = () => {

    setSelected( () => Math.floor(Math.random() * 7))

  }

  //This part tricky. Remember it is best to create a new arr/object in React rather than updating the original
  //Here we can use the map function. If the index is 4, we update the element by 1. Otherwise we just return the original element
  const voteFunction = () => {
    const arr = votes.map((element,index) => index === selected ? element+=1 : element)
    setVotes(arr)
    console.log(arr)
  }
  const maxVotes = Math.max(...votes)
  console.log(votes.indexOf(maxVotes))


  return (
    <div>
      <Display text={anecdotes[selected]} />
      <DisplayVotes votes={votes[selected]} />
      <Button clickFunction = {voteFunction} text="vote" />
      <Button clickFunction={clickFunction} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <DisplayMost text={anecdotes[votes.indexOf(maxVotes)]} votes={maxVotes}/>
    </div>
  )
}

export default App