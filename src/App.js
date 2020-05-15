import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./Banner";
import Content from "./Content";
import Navbar from "./Navbar";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Banner />
      <Content/>
    </div>
  );
}

export default App;
