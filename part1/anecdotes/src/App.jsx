import React, { useState } from 'react'

// Title Component
const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

// Anecdotes Component
const Anecdotes = ({ anecdotes, votes }) => {
  return (
    <div>
      <div>{anecdotes}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

// Button Component
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

// Most Voted Component
const MostVoted = ({ anecdotes, max }) => {
  return (
    <>
      <div>{anecdotes}</div>
      <div>has {max} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
  // console.log(voted)

  // Generate random anecdotes
  const nextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteClick = () => {
    const newVotes = [...voted]
    newVotes[selected] += 1
    setVoted(newVotes)
    // console.log(newVotes)
  }

  // Calculate max voted anecdote
  const max = Math.max(...voted)
  const index = voted.indexOf(max)

  return (
    <div>
      <Title title={"Anecdote of the day"} />
      <Anecdotes anecdotes={anecdotes[selected]} votes={voted[selected]} />
      <Button handleClick={voteClick} text={"vote"} />
      <Button handleClick={nextClick} text={"next anecdote"} />
      <Title title={"Anecdote with most votes"} />
      <MostVoted anecdotes={anecdotes[index]} max={max} />
    </div>
  )
}

export default App
