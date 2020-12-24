import * as React from "react";
// import * as ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import TestReact from "./privateReact/TestReact";
import ReactDOM from "./privateReact/react-dom";

function FunctionComp(props) {
  return <div> {props.name} </div>;
}

const jsx = (
  <div>
    <h1> JSX title </h1>
    <p>这是个p</p>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
