import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}

// ReactDOM.render(<ImageUpload />, document.getElementById("mainApp"));
// class MedName extends Components {
//     constructor(props) {
//         super(props);
//         this.state = {
//           medName1:"",
//           medName2:"",
//           medName3:""
//         };
// }
// Click() {
//     if (this.state.q) {
//       let apiKey = "9053358a3cc20dad4d523d2c99cfad03";
//       let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
//       var url = new URL(baseUrl);
//       var params = {
//         q: this.state.q,
//         appid: apiKey
//       };
//       url.search = new URLSearchParams(params);
//       fetch(url)
//         .then(data => data.json())
//         .then(json => {
//           this.setState({
//             temp: Math.floor(json.main.temp - 273),
//             humidity: json.main.humidity,
//             rain: json.weather[0].description
//           });
//         })
//         .then(() => {
//           let str = this.state.rain;
//           console.log(str);
//           if (/.*rain.*/.test(str)) {
//             alert("Carry an umbrella");
//           }
//         });
//     }
//   }
//   render() {
//     return (
//       <div>
//         <h2>Welcome</h2>
//         <h4>The weather of {this.state.q} is:</h4>
//         <p>temp (celsius) = {this.state.temp}</p>
//         <p>humidity = {this.state.humidity}</p>
//         <p>general = {this.state.rain}</p>

//         <div>
//           Enter the city:
//           <input
//             value={this.state.q}
//             onChange={e => {
//               this.setState({ q: e.target.value });
//             }}
//           />
//           <button
//             onClick={() => {
//               this.Click();
//             }}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     );
//
// }
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
