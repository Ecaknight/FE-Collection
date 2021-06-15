import React, { Component } from "react";
import { connect } from "../../lib/react-redux";
import { bindActionCreators } from "../../lib/redux";
import Helloworld from "./Helloworld";

class Page extends Component {
  render() {
    const { count, num, add, minus, add2 } = this.props;
    console.log(this.props);
    return (
      <div>
        <p>React + Redux + React-Redux Page</p>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <br />
        <p>num: {num}</p>
        <button onClick={add2}>add2</button>
        {count % 2 !== 0 && <Helloworld />}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { count: state.count, num: state.count2.num };
  },
  (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
      add2: () => ({ type: "ADD2", payload: 100 }),
    };
    creators = bindActionCreators(creators, dispatch);

    return {
      dispatch,
      ...creators,
    };
  }
)(Page);
