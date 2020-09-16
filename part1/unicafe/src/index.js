import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Buttons = ({ plusGood, plusBad, plusNeutral }) => {
  return (
    <div>
      <Button handleClick={plusGood} text="Good" />
      <Button handleClick={plusNeutral} text="Neutral" />
      <Button handleClick={plusBad} text="Bad" />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const allFeedback = good + neutral + bad
  const average = (good - bad) / allFeedback
  const posPrcnt = good / allFeedback * 100

  if (allFeedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text="good"/></td><td><StatisticLine value={good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="neutral"/></td><td><StatisticLine value={neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="bad"/></td><td><StatisticLine value={bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="all"/></td><td><StatisticLine value={allFeedback} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="average"/></td><td><StatisticLine value={average} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="positive"/></td><td><StatisticLine value={posPrcnt} /></td>
        </tr>
      </tbody>
    </table>
)
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Buttons plusGood={() => setGood(good + 1)} plusNeutral={() => setNeutral(neutral + 1)} plusBad={() => setBad(bad + 1)} />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
