import React, { Component } from "react";
import RoomSpec from "../components/RoomSpec";
import RoomViz from "../components/RoomViz";
import ResultOutput from "../components/ResultOutput";
import { connect } from "react-redux";
import { fetchPosts } from "../api/input";
import PropTypes from "prop-types";

import "./App.css";

class App extends Component {
  static propTypes = {
    inputFileReducer: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, inputFileReducer } = this.props;
    dispatch(fetchPosts(inputFileReducer));
  }

  onInputTextChange = e => {
    debugger;
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Robotic Hoover</h1>
          <a
            id="back-to-code"
            href="https://github.com/gixo/robotic-hoover-react"
          >
            Back to code
          </a>
        </header>
        <div className="app-content">
          <RoomSpec
            value="Loading content..."
            disabled={true}
            onChange={this.onInputTextChange}
          />
          <RoomViz />
          <ResultOutput />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inputFileReducer: state.inputFileReducer
});

export default connect(mapStateToProps)(App);
