import React, { Component } from 'react';
import Loadable from 'react-loadable';
import logo from './logo.svg';
import nodejs from './nodejs.png';
import './App.css';

const AsyncComponent = Loadable({
  loader: () => import("./Test"),
  loading: () => <div>loading...</div>
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <img src={nodejs} alt="nodejs" />
        </header>
        <AsyncComponent />
      </div>
    );
  }
}

export default App;
