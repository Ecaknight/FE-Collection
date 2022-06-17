import * as React from "react";
// import logo from './logo.svg';
import { useState } from 'react';
// import RefPage from './demo/RefPage';
import ClassDemo from './demo/ClassDemo'
import './App.css';

// function App() {
//   const [input, setInput] = useState('')
//   const [count, setCount] = useState(10)

  
//   return (
//     <div className="App">
//       <input value={input} onChange={(e) => setInput(e.target.value)} />
//       <br />
//       <button onClick={() => setCount(count - 1)}>{count}</button>
//       <ClassDemo />
//     </div>
//   );
// }

// export default App;

export default class App extends React.Component {
  state = {
    val: ''
  }

  handleChange = (e) => {
    this.setState({ val: e.target.value })
  }

  render() {
    const { val } = this.state
  
    return (
      <div>
        类组件debug
        <p>这里一个子节点段落</p>
        <p>
          <input value={val} onChange={this.handleChange} />
        </p>
        <ClassDemo />
      </div>
    )
  }
}

