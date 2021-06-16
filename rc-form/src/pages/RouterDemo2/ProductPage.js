import React, { Component } from 'react'

export default class ProductPage extends Component {
  render() {
    return (
      <div>
        product page {this.props.match.params.id}
      </div>
    )
  }
}
