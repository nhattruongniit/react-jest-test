import React, { useState, useReducer, useEffect, memo } from "react";
import axios from "axios";

const initialData = {
  list: [],
  error: null
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        list: [],
        error: true
      };
    case "SET_LIST":
      return {
        ...state,
        list: action.list,
        error: null
      };
    default:
      return state;
  }
};

function App() {
  const [counter, setCounter] = useState(0);
  const [data, dispatch] = useReducer(dataReducer, initialData);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=react")
      .then(response => {
        dispatch({ type: "SET_LIST", list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR" });
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div>
      <h1>My Counter</h1>
      <Counter counter={counter} />
      <button
        className="increment"
        type="button"
        onClick={() => setCounter(counter + 1)}
      >
        Increment
      </button>
      <button
        className="decrement"
        type="button"
        onClick={() => setCounter(counter - 1)}
      >
        Decrement
      </button>

      <h2>Form Login</h2>
      <form id="formLogin" onSubmit={handleSubmit}>
        <label>Email Address:</label>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>My Async Data</h2>
      {data.error && <div className="error">Error</div>}
      <ul>
        {data.list.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const Counter = memo(({ counter }) => {
  return (
    <div>
      <p className="counter">{counter}</p>
    </div>
  );
});

export default App;
