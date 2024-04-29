import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, count: action.count };
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_MY_COUNT':
      return { ...state, mycount: action.mycount };
    case 'INCREMENT_MY_COUNT':
      return { ...state, mycount: state.mycount + 1 };
    case 'DECREMENT_MY_COUNT':
      return { ...state, mycount: state.mycount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h2>mycount Value: {state.mycount}</h2>
      <Link to="/counter">Counter</Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/counter');
      dispatch({ type: 'SET', count: response.data.count });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const fetchmycount = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mycount');
      dispatch({ type: 'SET_MY_COUNT', mycount: response.data.mycount });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
    fetchmycount();
  }, [fetchCounter, fetchmycount]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/increment');
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/counter/decrement');
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const incrementmycount = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/mycount/increment');
      dispatch({ type: 'INCREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementmycount = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/mycount/decrement');
      dispatch({ type: 'DECREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment Counter</button>
      <button onClick={decrementCounter}>Decrement Counter</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
      <p>mycount: {state.mycount}</p>
      <button onClick={incrementmycount}>Increment mycount</button>
      <button onClick={decrementmycount}>Decrement mycount</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, mycount: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
