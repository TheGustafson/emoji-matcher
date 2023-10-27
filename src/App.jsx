// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import MatchingGame from './MatchingGame';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MatchingGame />
      </div>
    </Provider>
  );  
}

export default App;
