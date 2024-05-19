import React from 'react'

const Header = ({ course: { name } }) => { // nested object destructuring
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Part = ({ name, exercises }) => {  
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({ courses }) => { 
  // console.log(course)
  return (
    <div>
      {courses.map(course => <Part key={course.id} name={course.name} exercises={course.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => {
  // console.log(parts)

  // calculate total amount with reduce function
  const totalAmount = parts.reduce((total, current) => total + current.exercises, 0)
  // console.log(totalAmount)

  return (
    <div>
      <strong>total of {totalAmount} exercises</strong>
    </div>
  )
}

const Course = (props) => {
  // console.log(props)
  const { course } = props
  return (
    <div>
      <Header course={course} />
      <Content courses={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
