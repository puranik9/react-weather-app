import React, { Component } from 'react';
import './App.css';
import Titles from "./Titles";
import Form from "./Form";
import Weather from "./Weather";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Titles/>
        <Weather />
        <Form />
      </div>
    );
  }
}

export default App;
