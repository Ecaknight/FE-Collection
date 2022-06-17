import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// class ClassComponent extends React.Component {
//   render() {
//     return (
//       <div className="border">
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

// const TestElement = React.createElement(
//   "p",
//   { id: "hello" },
//   React.createElement("span", { className: "red" }, "你好 cr", React.createElement('span', null, '新世界')),
// );

// const jsx = (
//   <div className="border">
//     <h1>慢慢慢</h1>
//     <h1>全栈</h1>
//     <a href="https://www.kaikeba.com/">kkb</a>
//     <ClassComponent name="类组件" />
//     <TestElement />
//   </div>
// );

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
