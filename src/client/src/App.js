import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  onClick() {
    fetch("http://localhost:3002/api/speech-to-text/token")
      .then(response => {
        // console.log()
        return response.text();
      })
      .then(token => {
        var stream = recognizeMic({
          access_token: token,
          // token: token, // use `access_token` as the parameter name if using an RC service
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
          url: "https://gateway-lon.watsonplatform.net/speech-to-text/api"
        });
        stream.on("data", data => {
          console.log(data);
          this.setState({
            text: data.alternatives[0].transcript
          });
        });
        stream.on("error", function(err) {
          console.log(err);
        });
        // document.querySelector('#stop').onclick = stream.stop.bind(stream);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}

          <button onClick={this.onClick.bind(this)}> Click me</button>
          <h3>{this.state.text}</h3>
        </header>
      </div>
    );
  }
}

export default App;
