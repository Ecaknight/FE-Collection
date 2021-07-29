import React from "react";
import Button from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          className="tstN"
          onClick={(e) => {
            console.log(e);
          }}
        >
          hello
        </Button>
        <Button btnType="primary" size="lg">
          world
        </Button>
        <Button disabled>点击不了</Button>
        <Button btnType="link" href="http://www.baidu.com" disabled>
          百度去
        </Button>
        <Button btnType="danger">危险的</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
