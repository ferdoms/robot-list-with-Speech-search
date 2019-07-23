import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import { connect } from "react-redux";
import Scroll from "../components/Scroll";
import "./App.css";
import ErroBoundry from "../components/ErrorBoundary";
import { setSearchField, requestRobots, requestSpeechToText } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
    speechInput: state.requestSpeechToText.speechInput
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
    onRequestSpeechToText: () => dispatch(requestSpeechToText())
  };
};
export class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const {
      searchField,
      onSearchChange,
      robots,
      isPending,
      onRequestSpeechToText,
      speechInput
    } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase() || speechInput.toLocaleLowerCase());
    });
    return isPending ? (
      <div className="tc">Loading...</div>
    ) : (
      <div className="tc overflow-hidden">
        <h1 className="f1 light-blue">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <button
          onClick={onRequestSpeechToText}
          className="bg-light-purple lightest-blue dim br-pill b--lightest-blue"
        >
          audio
        </button>
        <Scroll>
          <ErroBoundry>
            <CardList robots={filteredRobots} />
          </ErroBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
