import { useEffect, useState } from 'react'
import personService from './services/persons'

/** ------ Components ------- */

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
    <button className='btn' type={type} onClick={handleNewChange}>{text}</button>
  )
}

// PersonForm 
const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='addPersonForm'>
        <Part text={'name'} value={newName} handleNewChange={handleNewName} />
        <Part text={'number'} value={newNumber} handleNewChange={handleNewNumber} />
      </div>
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

// Filter
const Filter = ({ text, value, handleFilterName }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleFilterName} />
    </div>
  )
}

// People
const People = ({ personAfterFilter }) => {
  return (
    <div>
      {personAfterFilter}
    </div>
  )
}

/** ------ Components ------- */

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [changeMessage, setChangeMessage] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameOnChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    // console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    // json-server auto generate id number
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // check new person name is already existed in persons
    const checkExistedPersonName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    // same username but different number condition
    const changedPerson = {...checkExistedPersonName, number: newNumber}

    if (checkExistedPersonName && checkExistedPersonName.number === newPerson.number) {
      window.alert(`${newName} is already added to phone book`)
    } 
    else if (checkExistedPersonName && checkExistedPersonName.number !== newPerson.number) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .updatePerson(checkExistedPersonName.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== checkExistedPersonName.id? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setChangeMessage(`Number of ${newName} is changed.`)
            setTimeout(() => { // After 3 seconds later set null value to changeMessage.
              setChangeMessage(null)
            }, 3000)
          })
          .catch(error => {
            setChangeMessage(`Information of ${newName} has already been removed from server`)
          })
      }
    } 
    else {
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

  // delete person with id
  const handleDeletePerson = (id) => {
    const foundPerson = persons.find(person => person.id === id)
    // console.log(foundPerson)

    if (window.confirm(`Are you sure want to delete User: ${foundPerson.name} ?`)) {
      personService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // Filter with user's input or show all persons
  const filteredPerson = persons.map(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons

  const FilteredPerson = ({ name, number, id }) => {
    // console.log(id)
    return (
      <div className='spacing'>
        <div><span className='userName'>{name}</span> {number}</div> 
        <Button text={'delete'} type='submit' handleNewChange={() => handleDeletePerson(id)} />
      </div>
    )
  }

  const personAfterFilter = filteredPerson.map(person => (
    <FilteredPerson key={person.id} name={person.name} number={person.number} id={person.id} />
  ))

  return (
    <div>
      <Heading text={'Phonebook'} />
      <Notification message={changeMessage} />
      <Filter text={'filter shown with'} value={filterName} handleFilterName={handleFilterName} />

      <Heading text={'add a new'} />
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNameOnChange}
        handleNewNumber={handleNumberOnChange}
      />

      <Heading text={'Numbers'} />
      <People personAfterFilter={personAfterFilter} />
    </div>
  )
}

export default App