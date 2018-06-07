import React, { Component } from "react";
import RoomSpec from "../components/RoomSpec";
import RoomViz from "../components/RoomViz";
import ResultOutput from "../components/ResultOutput";
import { connect } from "react-redux";
import { fetchInputFile } from "../actions/ActionCreators";
import PropTypes from "prop-types";

import "./App.css";
import { parseStateFromText } from "../actions/ActionCreators";

export class App extends Component {
  componentDidMount() {
    const { dispatch, inputFileName } = this.props;
    dispatch(fetchInputFile(inputFileName));
  }

  onInputTextChange = event => {
    this.props.dispatch(parseStateFromText(event.target.value));
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
            See code
          </a>
        </header>
        <div className="app-content">
          <RoomSpec
            inputTextValue={this.props.inputTextValue}
            disabled={this.props.isFetching}
            onChange={event => this.onInputTextChange(event)}
          />
          <div
            className={"data-viz" + (this.props.isFetching ? " fetching" : "")}
          >
            <RoomViz
              roomSize={this.props.roomSize}
              dirtPatches={this.props.dirtPatches}
              robotPosition={this.props.robotPosition}
              directions={this.props.robotPosition}
              isInputValid={this.props.isInputValid}
              hasCompletedAnimation={this.props.hasCompletedAnimation}
            />
          </div>
          <ResultOutput
            robotPosition={this.props.robotPosition}
            removedDirtPatchesCount={this.props.removedDirtPatchesCount}
          />
        </div>
      </div>
    );
  }

  static propTypes = {
    inputFileName: PropTypes.string.isRequired,
    inputTextValue: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    roomSize: PropTypes.arrayOf(PropTypes.number.isRequired),
    dirtPatches: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
    ),
    robotPosition: PropTypes.arrayOf(PropTypes.number.isRequired),
    directions: PropTypes.arrayOf(PropTypes.string),
    isInputValid: PropTypes.bool.isRequired,
    hasCompletedAnimation: PropTypes.bool.isRequired,
    removedDirtPatchesCount: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };
}

const mapStateToProps = state => ({
  inputFileName: state.roomConfiguration.inputFileName,
  inputTextValue: state.roomConfiguration.inputTextValue,
  isFetching: state.roomConfiguration.isFetching,
  roomSize: state.roomConfiguration.roomSize,
  dirtPatches: state.robotConfiguration.dirtPatchesLocations,
  robotPosition: state.robotConfiguration.robotPosition,
  directions: state.robotConfiguration.directions,
  isInputValid: state.roomConfiguration.isInputValid,
  hasCompletedAnimation: state.robotConfiguration.hasCompletedAnimation,
  removedDirtPatchesCount: state.robotConfiguration.removedDirtPatchesCount
});

export default connect(mapStateToProps)(App);
