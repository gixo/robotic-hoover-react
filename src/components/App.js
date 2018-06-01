import React, { Component } from "react";
import RoomSpec from "./RoomSpec";
import RoomViz from "./RoomViz";
import ResultOutput from "./ResultOutput";
import { fetchPosts } from "../actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
  /*
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };*/

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPosts(selectedSubreddit));
  }

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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(App);
