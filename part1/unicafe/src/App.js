import { useState } from 'react'


const Button = (props) => {

  const {clickFunction,text} = props

  return (
    <button onClick={clickFunction}>{text}</button>
  )

}

const Statistics = (props) => {

  const {good,neutral,bad,all,average,positive} = props

  if (good == 0 && neutral == 0 && bad == 0) return <h3>no feedback given</h3>
  
    return (
    <table>
        <StatisicLine values={good} text="good"/>
        <StatisicLine values={neutral} text="neutral"/>
        <StatisicLine values={bad} text="bad"/>
        <StatisicLine values={all} text="all"/>
        <StatisicLine values={average} text="average"/>
        <StatisicLine values={positive} text="positive"/>
    </table>
    )
  

}

const StatisicLine = (props) => {

  const {values,text} = props

  return (
    <tr>
      <td>{text}</td>
      <td>{values}</td>
    </tr>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)

  const all = good + neutral + bad
  const average = ((good-bad) / all).toFixed(2)
  const positive = (good / all).toFixed(2) + "%"


  return (
    <div>
      <h1>give feedback</h1>
      <Button clickFunction={addGood} text="good"/>
      <Button clickFunction={addNeutral} text="neutral"/>
      <Button clickFunction={addBad} text="bad"/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
    
  )
}

export default App
