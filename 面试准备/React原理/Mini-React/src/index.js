import React, { Component, useState } from "react";
import ReactDOM from 'react-dom';
// import ReactDOM, { useState } from "./kreact/react-dom";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import ReactLazyDemo from './Demo/react-lazy'

function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      <button
        onClick={() => {
          console.log("count", count); //sy-log
          setCount(count + 1);
        }}
      >
        {count + ""}
      </button>
      {count % 2 ? <p>{props.name}</p> : <p>omg</p>}
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FragmentComponent(props) {
  return (
    <React.Fragment>
      <h1>111</h1>
      <h1>222</h1>
    </React.Fragment>
  );
}

const jsx = (
  <div className="border">
    <h1>慢慢慢</h1>
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <FragmentComponent />
  </div>
);

ReactDOM.render(<ReactLazyDemo />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
