import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import { connect } from "react-redux";
import Scroll from "../components/Scroll";
import "./App.css";
import ErroBoundry from "../components/ErrorBoundary";
import { setSearchField, requestRobots, requestSpeechToText, speechOff } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
    speechInput: state.requestSpeechToText.speechInput,
    isSpeech: state.requestSpeechToText.isSpeech
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
    onRequestSpeechToText: () => dispatch(requestSpeechToText()),
    onSpeechOff: () => dispatch(speechOff())
  };
};
export class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }
  filterRobotsByName(name){
    const { robots } = this.props;
    return robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(name.toLocaleLowerCase());
    });
  }
  render() {
    const {
      searchField,
      onSearchChange,
      isPending,
      onRequestSpeechToText,
      speechInput,
      isSpeech,
      onSpeechOff
    } = this.props;
    let filteredRobots;
    if(speechInput){
      filteredRobots = this.filterRobotsByName(speechInput);
    }else{
      filteredRobots = this.filterRobotsByName(searchField)
    }
    

    return isPending ? (
      <div className="tc">Loading...</div>
    ) : (
      <div className="tc overflow-hidden">
        <h1 className="f1 light-blue">RoboFriends</h1>
        {
          isSpeech ? (
            <div className="tc">
            <h3 className="dib light-blue tl" style={{width:"350px"}}><strong className="ph2">Searching:</strong>{speechInput}</h3>
            <button
          id="stop"
          onClick={onSpeechOff}
          className="bg-light-purple lightest-blue dim br-pill b--lightest-blue"
        >
          X
        </button>
        </div>
          ) :(
            <div className="tc">
              <SearchBox searchChange={onSearchChange}/>
        
        <button
          onClick={onRequestSpeechToText}
          className="bg-light-purple lightest-blue dim br-pill b--lightest-blue"
        >
          audio
        </button>
            </div>
          )
        }        
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
