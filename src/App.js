import React from "react";
import "./App.css";
import Demonym from "./Demonym";
import CountrySelector from "./CountrySelector";

export default class App extends React.Component {
  state = {
    countries: [],
    selected: null,
  };
  componentDidMount() {
    fetch("https://country.register.gov.uk/records.json?page-size=5000")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        const countries = Object.keys(data).map((key) => data[key].item[0]);
        this.setState({
          countries,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }
  setSelected(selected) {
    this.setState({ selected });
  }
  render() {
    const demon = this.state.selected ? (
      <Demonym
        name={this.state.selected[`citizen-names`]}
        country={this.state.selected.name}
      />
    ) : (
      <div className="demonym_app__placeholder">Select a country about</div>
    );
    const error = this.state.error ? (
      <div className="demonym_app__error">{this.state.error}</div>
    ) : (
      ""
    );
    return (
      <div className="demonym_app">
        <CountrySelector
          countries={this.state.countries}
          changeHandler={(selected) => this.setSelected(selected)}
        />
        {demon}
        {/* <Demonym name="Barbadian" country="Barbados" /> */}
      </div>
    );
  }
}
