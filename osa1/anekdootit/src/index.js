import React, { useState } from "react";
import ReactDOM from "react-dom";

// To render a simple button with event listener and text
const Button = (props) => {
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

// Render current anecdotes votes
const CurrentAnecdoteStatistic = (props) => {
  const { currentAnectode, anecdoteVoteList } = props;
  return (
    <div>
      <p>has {anecdoteVoteList[currentAnectode]} votes</p>
    </div>
  );
};
const TopAnecdote = (props) => {
  const { anecdoteVoteList, anecdotes } = props;

  // Find the max voted anectode of all available and its idx
  var maxAnecdote = anecdotes[0];
  var maxVotes = 0;
  var maxIndex = 0;
  for (var i = 0; i < anecdoteVoteList.length; ++i) {
    if (anecdoteVoteList[i] > maxVotes) {
      // Update the max votes and its corresponding anecdote
      maxVotes = anecdoteVoteList[i];
      maxAnecdote = anecdotes[i];
      maxIndex = i;
    }
  }

  if (maxVotes === 0) {
    return <div>No anecdote has votes yet!</div>;
  }

  return (
    <div>
      <p>{maxAnecdote}</p>
      <p>has {anecdoteVoteList[maxIndex]} votes</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length));

  // Even handler for random button
  const handleSelected = () => {
    const randNum = Math.trunc(Math.random() * anecdotes.length);
    setSelected(randNum);
  };

  // Event handler for vote button
  const handleVoted = () => {
    var copy = [...votes];
    copy[selected] += 1;
    setVote(copy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>

      <Button handleClick={handleSelected} text="next anecdote" />
      <Button handleClick={handleVoted} text="vote" />
      <CurrentAnecdoteStatistic
        currentAnectode={selected}
        anecdoteVoteList={votes}
      />

      <h2>Anecdote with most votes</h2>
      <TopAnecdote anecdoteVoteList={votes} anecdotes={anecdotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("react-root")
);

if (module.hot) {
  module.hot.accept();
}
