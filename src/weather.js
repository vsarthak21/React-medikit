import React, { Component } from "react";
//mport fire from "./Fire";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
      temp: null,
      humidity: null,
      rain: null
    };
  }
  Click() {
    if (this.state.q) {
      let apiKey = "9053358a3cc20dad4d523d2c99cfad03";
      let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
      var url = new URL(baseUrl);
      var params = {
        q: this.state.q,
        appid: apiKey
      };
      url.search = new URLSearchParams(params);
      fetch(url)
        .then(data => data.json())
        .then(json => {
          this.setState({
            temp: Math.floor(json.main.temp - 273),
            humidity: json.main.humidity,
            rain: json.weather[0].description
          });
        })
        .then(() => {
          let str = this.state.rain;
          console.log(str);
          if (/.*rain.*/.test(str)) {
            alert("Carry an umbrella");
          }
        });
    }
  }
  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <h4>The weather of {this.state.q} is:</h4>
        <p>temp (celsius) = {this.state.temp}</p>
        <p>humidity = {this.state.humidity}</p>
        <p>general = {this.state.rain}</p>

        <div>
          Enter the city:
          <input
            value={this.state.q}
            onChange={e => {
              this.setState({ q: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.Click();
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Weather;

{
  /* {this.state.files.length != 0 ? (
              <div>
                <div className="pre-container">
                  <pre>{JSON.stringify(this.state.body, null, 2)}</pre>
                </div>
              </div>
            ) : null}
            {this.state.data.length != 0 ? (
              <div>
                <h3 className="text-center mt-25">Response</h3>
                <div className="pre-container">
                  <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                </div>
              </div>
            ) : null}  */
}
