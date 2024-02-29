import React, { useState, useEffect } from "react";
import "./App.css";

function Counter({ id, setNumber, hasSetNumberFeature }) {
  // Initialize state from localStorage or default to 0
  const [count, setCount] = useState(
    () => Number(localStorage.getItem(`count-${id}`)) || 0
  );
  const [tally, setTally] = useState(
    () => Number(localStorage.getItem(`tally-${id}`)) || 0
  );
  const [label, setLabel] = useState(
    () => localStorage.getItem(`label-${id}`) || ""
  );

  // Persist state to localStorage on change
  useEffect(() => {
    localStorage.setItem(`count-${id}`, count);
    localStorage.setItem(`tally-${id}`, tally);
    localStorage.setItem(`label-${id}`, label);
  }, [count, tally, label, id]);

  const increment = () => {
    if (hasSetNumberFeature) {
      if (count + 1 >= setNumber) {
        setCount(0);
        setTally(tally + 1);
      } else {
        setCount(count + 1);
      }
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    setCount(count - 1 < 0 ? 0 : count - 1);
  };

  const clearCount = () => {
    setCount(0);
    if (hasSetNumberFeature) {
      setTally(0);
    }
  };

  return (
    <div className="counter">
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="label-input"
      />
      {hasSetNumberFeature && (
        <div className="tally">
          {tally}/{setNumber}
        </div>
      )}
      <div className="incremental-number">{count}</div>
      <div className="controls">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={clearCount}>Clear</button>
      </div>
    </div>
  );
}

function App() {
  const [setNumber, setSetNumber] = useState(
    () => Number(localStorage.getItem("setNumber")) || 10
  );

  // Persist setNumber to localStorage on change
  useEffect(() => {
    localStorage.setItem("setNumber", setNumber);
  }, [setNumber]);

  return (
    <div className="App">
      <div className="counters">
        <Counter
          id="counter1"
          setNumber={setNumber}
          hasSetNumberFeature={true}
        />
        <Counter id="counter2" hasSetNumberFeature={false} />
        <Counter id="counter3" hasSetNumberFeature={false} />
      </div>
      <div className="set-number">
        <label>
          Set Number:
          <input
            type="number"
            value={setNumber}
            onChange={(e) => setSetNumber(parseInt(e.target.value) || 0)}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
