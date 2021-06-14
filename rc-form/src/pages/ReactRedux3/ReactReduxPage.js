import React, { Component } from "react";

import { connect, bindActionCreators } from "./mreactredux";

class ReactReduxPage extends Component {
  render() {
    const { count, add, minus } = this.props;
    return (
      <div>
        <p>React Redux Page3</p>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ count: state }),
  (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };

    creators = bindActionCreators(creators, dispatch);
    return {
      dispatch,
      ...creators,
    };
  }
)(ReactReduxPage);
