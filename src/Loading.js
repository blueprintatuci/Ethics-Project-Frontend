import React, { Component } from "react";
import spinner from "./assets/spinner.svg";
import "./loading.scss";

export default class Loading extends Component {
  render() {
    return (
      <div className="spinner-background">
        <img src={spinner} className="spinner-animation" alt="load"/>
      </div>
    );
  }
}