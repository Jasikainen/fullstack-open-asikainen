import React, { useState } from "react";
import ReactDOM from "react-dom";

const calculateAverage = (good, neutral, bad) => {
  if (good + neutral + bad === 0) {
    return 0;
  }
  const total = good * 1 + bad * -1;
  return total / (good + neutral + bad);
};

const calculatePositive = (good, neutral, bad) => {
  if (good + bad + neutral === 0) {
    return 0;
  }
  const total = good + bad + neutral;
  return (1 - (total - good) / total) * 100;
};

const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value.toFixed(2)}
        {props.text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const average = calculateAverage(good, neutral, bad);
  const positive = calculatePositive(good, neutral, bad);
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given yet</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // Save the buttons to own specific states
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));

if (module.hot) {
  module.hot.accept();
}
