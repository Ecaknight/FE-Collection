// 利用react来测试性能的代码
import { Component, useLayoutEffect, useState } from "react";
import { unstable_trace as trace } from "scheduler/tracing";

import "./styles.css";

// 需单开页面后，打开 React Profiler 并记录

/**
 * 结论：
 * Profiler 不会统计 componentDid 和 useLayoutEffect 方法的执行时间
 */

function costTimeCode() {
  for (let i = 0; i < 1000; ++i) {
    for (let i = 0; i < 1000; ++i) {
      for (let i = 0; i < 1000; ++i) {}
    }
  }
}

class ClassComponent extends Component {
  state = {
    value: 0
  };

  execCostTimeCode() {
    if (this.state.value % 2 === 0) {
      costTimeCode();
    }
  }

  componentDidMount() {
    this.execCostTimeCode();
  }

  componentDidUpdate() {
    this.execCostTimeCode();
  }

  clickUpdateBtn() {
    const { value } = this.state;
    trace("click ClassComponent's Update button", performance.now(), () => {
      this.setState({ value: value + 1 });
    });
  }

  render() {
    const { value } = this.state;
    costTimeCode();
    return (
      <fieldset>
        <legend>Profiler 是否统计 componentDid 方法</legend>
        <div style={{ margin: "20px 0" }}>
          下次 componentDid 中是否执行耗时代码：
          {value % 2 ? "是" : "否"}
        </div>
        <button onClick={() => this.clickUpdateBtn()}>点我更新</button>
      </fieldset>
    );
  }
}

function FunctionComponent() {
  const [value, setValue] = useState(0);
  const clickUpdateBtn = () => {
    trace("click FunctionComponent's Update button", performance.now(), () => {
      setValue(value + 1);
    });
  };
  useLayoutEffect(() => {
    if (value % 2 === 1) {
      costTimeCode();
    }
  });

  return (
    <fieldset>
      <legend>Profiler 是否统计 useLayoutEffect 方法</legend>
      <div style={{ margin: "20px 0" }}>
        下次 useLayoutEffect 中是否执行耗时代码：
        {value % 2 ? "否" : "是"}
      </div>
      <button onClick={clickUpdateBtn}>点我更新</button>
    </fieldset>
  );
}

export default function App() {
  return (
    <div className="App">
      <ClassComponent />
      <FunctionComponent />
    </div>
  );
}
