import React, { Component } from "react";
import "./App.css";
// import Navbar from "Navbar.js";

class Medikit extends Component {
  constructor(props) {
    super();
    this.state = {
      files: [],
      fileName: "",
      fileComp: "",
      final_comp: [
        {
          "Terbutaline Sulphate IP": "125",
          "Ambroxol HCI IP": "15 mg",
          "Guaiphenesin IP": "50 mg",
          "Menthol IP": "2.5 mg"
        }
      ],
      body: {},
      name: [],
      salts: [
        {
          Salt: "Terbutaline Sulphate IP",
          Concentration: "125 mg"
        },
        { Salt: "Ambroxol HCI IP", Concentration: "15 mg" },
        { Salt: "Guaiphenesin IP", Concentration: "50 mg" },
        { Salt: "Menthol IP", Concentration: "2.5 mg" }
      ],
      showLoader: false,
      show_first: false,
      show_second: false,
      show_next: false,
      show_form: true,
      show_getName: false,
      selected_name: " "
    };
  }

  handleChange(event) {
    console.log("props value", this.props);
    console.log("props", this.props.trigger());
    let files = event.target.files;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file
      };
      this.setState({
        files: files,
        fileName: file.name,
        body: fileInfo.base64.split(",")[1],
        show_next: true
      });
    };
  }

  handleSubmit(event) {
    this.setState({ show_first: false, show_second: true });
    event.preventDefault();
  }
  handleAcceptNameSubmit(event) {
    event.preventDefault();
    const e = event.nativeEvent;
    this.setState({
      final_comp: [
        ...this.state.final_comp,
        [e.target.salt.value, e.target.concentration.value]
      ]
    });
  }

  onCheck(event) {
    event.preventDefault();
    alert(event.target.checked);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    var checkedValue = [];
    var inputElements = document.getElementsByClassName("check");
    //alert(inputElements.length);
    //var abc = document.getElementById("fever1");
    //alert(abc.value);

    for (var i = 0; inputElements.length; ++i) {
      if (inputElements[i].checked) {
        checkedValue.push(inputElements[i].value);
      }
    }
    console.log(checkedValue);

    // convert node list to an array
    // const checkboxArray = Array.prototype.slice.call(disease);

    // // extract only the checked checkboxes
    // const checkedCheckboxes = checkboxArray.filter(input => input.checked);
    // console.log("checked array:", checkedCheckboxes);

    // // use .map() to extract the value from each checked checkbox
    // const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
    // console.log("checked array values:", checkedCheckboxesValues);

    // console.log(event.target.one.checked);
  }

  click = () => {
    this.setState({
      showLoader: true,
      show_next: false
    });
    fetch(
      "https://7as9it46jc.execute-api.us-east-1.amazonaws.com/dev/medicine/name",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: this.state.body
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          name: responseJson.Names,
          showLoader: false,
          show_second: true,
          show_first: false,
          fileName: ""
        });
        // alert(this.state.name);
      });
  };

  clickComp = () => {
    this.setState({
      showLoader: true,
      show_next: false
    });
    fetch(
      "https://q5eia2b2j4.execute-api.us-east-1.amazonaws.com/dev/medicine/comp",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: this.state.body
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          salts: responseJson.Compositions,
          showLoader: false,
          show_second: false,
          show_form: true
        });
      });
  };

  createTable = () => {
    let table = [];
    let count = 0;
    for (let i = 0; i < this.state.salts.length - 1; i++) {
      let children = [];
      children.push(
        <form onSubmit={this.handleAcceptNameSubmit.bind(this)}>
          <td>
            <label>
              Salt Name: &#x000A0;&#x000A0;
              <input
                defaultValue={this.state.salts[i]}
                autoComplete="off"
                name="salt"
              />
            </label>
          </td>
          <td>
            <label>
              Concentration(mg): &#x000A0;&#x000A0;
              <input
                defaultValue={this.state.salts[i]}
                autoComplete="off"
                name="concentration"
              />
            </label>
          </td>
        </form>
      );
      table.push(children);
      count++;
    }
    for (let i = count; i < count + 3; i++) {
      let children = [];
      children.push(
        <form onSubmit={this.handleAcceptNameSubmit.bind(this)}>
          <td>
            <label>
              Salt Name: &#x000A0;&#x000A0;
              <input defaultValue="" autoComplete="off" name="salt" />
            </label>
          </td>
          <td>
            <label>
              Concentration(mg): &#x000A0;&#x000A0;
              <input defaultValue="" autoComplete="off" name="concentration" />
            </label>
          </td>
        </form>
      );
      table.push(children);
    }
    return table;
  };

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <div>
          <div className="jumbotron jumbotron-fluid bg">
            <div className="container">
              <div className="row">
                <div className="col-sm-4" />

                <div className="col-sm-4">
                  <h1>Add Medicine</h1>
                </div>
                <div className="col-sm-4" />
              </div>
            </div>
          </div>
          {this.state.show_first ? (
            <div>
              <div className="container">
                <br />

                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-7">
                    <label>
                      Medicine Name:
                      <br />
                      (Upload Focused Image of Medicine Name)
                    </label>
                    &#x000A0;&#x000A0;&#x000A0;&#x000A0;&#x000A0;
                    <input
                      id="im"
                      type="file"
                      className="file"
                      placeholder="Choose Image"
                      onChange={this.handleChange.bind(this)}
                    />
                    {this.state.fileName.length === 0 ? (
                      <label for="im">Choose Image</label>
                    ) : (
                      <label for="im">Change Image</label>
                    )}
                    <br />
                    <br />
                  </div>
                  <div className="col-sm-2" />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3" />
                <div className="col-sm-2">
                  {this.state.show_next ? (
                    <button
                      type="button"
                      className="btn btn-secondary b1"
                      onClick={this.click.bind(this)}
                    >
                      Next
                    </button>
                  ) : null}
                </div>
                <div className="col-sm-2">
                  {this.state.showLoader ? (
                    <img
                      className="loader"
                      src={require("./Spinner.gif")}
                      alt="Loading"
                    />
                  ) : null}
                </div>
                {/* <div className="col-sm-3 c1">
                  <div className="text-center">
                    {this.state.name.length > 0 ? (
                      <form onSubmit={this.handleSubmit.bind(this)}>
                        <label className="label">
                          Select a Name:
                          <input
                            className="list-group"
                            name="name"
                            list="nameList"
                            autoComplete="off"
                            value={this.state.name[3]}
                            onChange={e => {
                              this.setState({
                                selected_name: e.target.value,
                                show_next: true
                              });
                            }}
                          />
                          <datalist id="nameList">
                            <option value={this.state.name[0]}>
                              {this.state.name[0]}
                            </option>
                            <option value={this.state.name[1]}>
                              {this.state.name[1]}
                            </option>
                            <option value={this.state.name[2]}>
                              {this.state.name[2]}
                            </option>
                          </datalist>
                        </label>
                        {this.state.show_next ? (
                          <input
                            type="submit"
                            value="Next->"
                            className="btn btn-secondary b2"
                          />
                        ) : null}
                      </form>
                    ) : null}
                  </div>
                </div> */}
                <div className="col-sm-5" />
              </div>
            </div>
          ) : null}
        </div>

        {/* Second Page */}
        <div className="align-center">
          {this.state.show_second ? (
            <div>
              <div className="container">
                <br />

                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-7">
                    <label>
                      Medicine Compositons:
                      <br />
                      (Upload Focused Image of Medicine Compositons)
                    </label>
                    &#x000A0;&#x000A0;&#x000A0;&#x000A0;&#x000A0;
                    <input
                      id="im"
                      type="file"
                      className="file"
                      placeholder="Choose Image"
                      onChange={this.handleChange.bind(this)}
                    />
                    {this.state.fileName.length === 0 ? (
                      <label for="im">Choose Image</label>
                    ) : (
                      <label for="im">Change Image</label>
                    )}
                    <br />
                    <br />
                  </div>
                  <div className="col-sm-2" />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3" />
                <div className="col-sm-2">
                  {this.state.show_next ? (
                    <button
                      type="button"
                      className="btn btn-secondary b1"
                      onClick={this.clickComp.bind(this)}
                    >
                      Next
                    </button>
                  ) : null}
                </div>
                <div className="col-sm-2">
                  {this.state.showLoader ? (
                    <img
                      className="loader"
                      src={require("./Spinner.gif")}
                      alt="Loading"
                    />
                  ) : null}
                </div>
                <div className="col-sm-5" />
              </div>
              <br />

              {/* {this.state.salts.length > 0 ? (
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-7 table">
                    <h6>Recognised Compositons:</h6>
                    <table className="table">{this.createTable()}</table>
                  </div>
                  <div className="col-sm-2" />
                  <button
                    type="submit"
                    className="btn btn-secondary b3"
                    onClick={() => {
                      this.setState({
                        show_form: true,
                        show_second: false
                      });
                    }}
                  >
                    Next->
                  </button>
                </div>
              ) : null} */}
            </div>
          ) : null}
        </div>

        {/* Third Page */}
        {this.state.show_form ? (
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <form onSubmit={this.handleFormSubmit.bind(this)} name="myform">
                Name: &#x000A0;&#x000A0;
                <input
                  name="name"
                  list="nameList"
                  autoComplete="off"
                  defaultValue="PARACIP-500"
                  onChange={e => {
                    this.setState({
                      selected_name: e.target.value,
                      show_next: true
                    });
                  }}
                />
                {/* <datalist id="nameList">
                  <option value={this.state.name[0]}>
                    {this.state.name[0]}
                  </option>
                  <option value={this.state.name[1]}>
                    {this.state.name[1]}
                  </option>
                  <option value={this.state.name[2]}>
                    {this.state.name[2]}
                  </option>
                </datalist> */}
                <br />
                <br />
                Compositons:
                <table className="table form">
                  {/* <tr>
                    <th>Salt Name</th>
                    <th>Cencentration in mg</th>
                  </tr> */}
                  {this.createTable()}
                </table>
                <br />
                Referred By:&#x000A0;&#x000A0;
                <input type="text" name="ref" defaultValue="Dr. " />
                <br />
                <br />
                Expiry Date:&#x000A0;&#x000A0;
                <input
                  type="date"
                  data-date=""
                  data-date-format="DD MMMM YYYY"
                  autoComplete="off"
                />
                <br />
                Disease:
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      value="fever"
                      //onChange={this.onCheck.bind(this)}
                    />
                    Fever
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      defaultValue="flue"
                    />
                    Flue
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      defaultValue="ache"
                    />
                    Ache
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      defaultValue="liver"
                    />
                    Liver Disease
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      defaultValue="heart"
                    />
                    Heart Disease
                  </label>
                </div>
                <button type="submit" className="btn btn-secondary submit">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-sm-3" />
          </div>
        ) : null}
        <div />
      </div>
    );
  }
}
export default Medikit;
