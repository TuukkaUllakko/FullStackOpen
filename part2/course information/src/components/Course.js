import React from 'react'

const Header = ({course}) =>
{
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Content = ({course}) =>
{
  const courses = course.parts.map(part => <Contents key={part.id} name={part.name} exercises={part.exercises} id={part.id}/>)

  return (
    <div>
      {courses}
    </div>
  )
}

const Contents = (props) =>
{
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) =>
{
  const totalAmount = props.course.parts.reduce(function(sum, curr) {
    return sum + curr.exercises
  }, 0)

  return (
    <div>
      <b>total of {totalAmount} exercises</b>
    </div>
  )
}

const Course = ({course}) =>
{
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map(course => {
        return (
          <div key={course.id}>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
          </div>
        )
      })}
    </div>
  )
}

export default Course