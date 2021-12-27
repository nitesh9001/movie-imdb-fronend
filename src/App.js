import React, { Component } from "react";
import Header from "./component/Header";
import './App.css';
import SnackBar from "./component/snackBar";

const  App = (props) => {
    return (
      <div className="app">
        <div className="overlays">
          <div>
           <Header setsearch = {props?.setsearch}/>
          </div>
          <div className="overlays-dashboard">{props.children}</div>
          </div>
        <SnackBar />
      </div>
    );
  }

export default App;