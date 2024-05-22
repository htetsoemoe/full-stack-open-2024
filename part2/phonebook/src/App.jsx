import { useEffect, useState } from 'react'
import noteServices from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    noteServices
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

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const checkNewName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (checkNewName && checkNewName.number === newPerson.number) {
      window.alert(`${newName} is already added to phone book`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <h2>Filter user</h2>
        filter shown with: <input />
        <h2>Add a new</h2>
        <div>
          name: <input onChange={handleNameOnChange} />
        </div>
        <div>
          number: <input onChange={handleNumberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App