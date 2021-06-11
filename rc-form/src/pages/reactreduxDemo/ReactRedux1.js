import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReactRedux1 extends Component {
  render() {
    const { count, add, minus } = this.props
    return (
      <div>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    count: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    add: () => {
      dispatch({ type: 'ADD'})
    },
    minus: () => dispatch({ type: 'MINUS'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux1)
