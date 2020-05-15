import React, { Component } from "react";
import banner_logo from "./assets/banner_logo.svg";
import "./banner.scss";


export default class Banner extends Component {
  render() {
    return (
      <div className="background">
        <img src={banner_logo} className="banner-logo" alt = "logo"/>
      </div>
    );
  }
}