import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

interface Comment {
  _id: string;
  name: string;
}

function App() {

  const[comments, setComments] = useState<any[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="comments">
        <h1>Comments</h1>
     </div>
    </div>
  );
}

export default App;
