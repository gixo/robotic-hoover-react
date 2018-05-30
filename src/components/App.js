import React, { Component } from "react";
import RoomSpec from "./RoomSpec";
import RoomViz from "./RoomViz";
import ResultOutput from "./ResultOutput";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Robotic Hoover</h1>
        </header>
        <div className="App-content">
          <RoomSpec />
          <RoomViz />
          <ResultOutput />
        </div>
      </div>
    );
  }
}

export default App;
