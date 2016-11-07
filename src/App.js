import React, { Component } from 'react';
import logo from './Beaver-icon.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="App">
        <div class="App-header">
          <img src={logo} class="App-logo" alt="logo" />
          <h2>Welcome to Canada</h2>
        </div>
        <p class="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
