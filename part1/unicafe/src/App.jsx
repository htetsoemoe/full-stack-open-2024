import React, { useState } from 'react'

// StatisticLine Component
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// Statistics Component
const Statistics = ({good, neutral, bad}) => {
  // calculate sum value
  const all = good + neutral + bad

  // calculate average value
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all

  if (all === 0) {
    return (
      <p>No feed given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text='positive' value={`${parseFloat(good / all) * 100} %`} />
      </tbody>
    </table>
  )
}

// Button Component
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodBtn = () => {
    setGood(good + 1)
  }

  const handleNeutralBtn = () => {
    setNeutral(neutral + 1)
  }

  const handleBadBtn = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodBtn} text={'good'} />
      <Button handleClick={handleNeutralBtn} text={'neutral'} />
      <Button handleClick={handleBadBtn} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
