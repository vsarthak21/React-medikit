import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Medikit from "./components/Medikit";

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      count: 0
    };
  }
  changeCount = event => {
    this.setState({
      count: this.state.count + 1
    });
    console.log(this.state.count);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Medikit trigger={this.changeCount.bind(this)} name="sarthak" />
      </div>
    );
  }
}
export default App;
