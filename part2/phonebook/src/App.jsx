import { useEffect, useState } from 'react'
import personService from './services/persons'

/** Components */
// Heading
const Heading = ({ text }) => (
  <h1>{text}</h1>
)

// Part component which used in PersonForm component
const Part = ({ text, value, handleNewChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleNewChange} />
    </div>
  )
}

// Button
const Button = ({ type, text, handleNewChange }) => {
  return (
    <button type={type} onClick={handleNewChange}>{text}</button>
  )
}

// PersonForm 
const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <Part text={'name'} value={newName} handleNewChange={handleNewName} />
      <Part text={'number'} value={newNumber} handleNewChange={handleNewNumber} />
      <Button text='add' type='submit' />
    </form>
  )
}

// Notification
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [changeMessage, setChangeMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameOnChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    // check new person name is already existed in persons
    const checkNewName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (checkNewName && checkNewName.number === newPerson.number) {
      window.alert(`${newName} is already added to phone book`)
    } else {
      // Save new person to server
      personService
        .create(newPerson)
        .then(savedPerson => {
          setPersons(persons.concat(savedPerson))
          setNewName('')
          setNewNumber('')
          setChangeMessage(`Successfully added Username: ${newName}`)
          setTimeout(() => { // After 3 seconds later set null value to changeMessage.
            setChangeMessage(null)
          }, 3000)
        })
        .catch(error => {
          setChangeMessage(`Error: ${error.response.data.error}`)
        })
    }
  }

  return (
    <div>
      <Heading text={'Phonebook'} />
      {/* Notification Component */}
      <Notification message={changeMessage} />
      {/* Filter Component */}

      <Heading text={'add a new'} />
      {/* PersonForm Component */}
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNameOnChange}
        handleNewNumber={handleNumberOnChange}
      />

      <Heading text={'Numbers'} />
      {persons.map((person) => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App