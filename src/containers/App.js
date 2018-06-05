import React, { Component } from "react";
import RoomSpec from "../components/RoomSpec";
import RoomViz from "../components/RoomViz";
import ResultOutput from "../components/ResultOutput";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/ActionCreators";
import PropTypes from "prop-types";

import "./App.css";
import { parseStateFromText } from "../actions/ActionCreators";

class App extends Component {
  static propTypes = {
    inputFileName: PropTypes.string.isRequired,
    inputTextValue: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, inputFileName } = this.props;
    dispatch(fetchPosts(inputFileName));
  }

  onInputTextChange = event => {
    this.props.dispatch(parseStateFromText(event.target.value));
  };

  render() {
    const { inputTextValue, isFetching } = this.props;

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
            inputTextValue={inputTextValue}
            disabled={isFetching}
            onChange={event => this.onInputTextChange(event)}
          />
          <RoomViz
            roomSize={this.props.roomSize}
            dirtPatches={this.props.dirtPatches}
            robotLocation={this.props.robotLocation}
            directions={this.props.robotLocation}
          />
          <ResultOutput />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inputFileName: state.roomConfiguration.inputFileName,
  inputTextValue: state.roomConfiguration.inputTextValue,
  isFetching: state.roomConfiguration.isFetching,
  roomSize: state.roomConfiguration.roomSize,
  dirtPatches: state.roomConfiguration.dirtPatches,
  robotLocation: state.roomConfiguration.robotLocation,
  directions: state.roomConfiguration.directions
});

export default connect(mapStateToProps)(App);
