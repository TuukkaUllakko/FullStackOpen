import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>
{
  console.log(props)
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Content = (props) =>
{
  console.log(props)
  return (
    <div>
      {props.parts.map(parts => <div>{parts.name} {parts.exercises}</div>)}
    </div>
  )
}

const Total = (props) =>
{
  console.log(props)
  return (
    <div>
      Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course ={course.name} />
      <Content parts ={course.parts}/>
      <Total total ={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))