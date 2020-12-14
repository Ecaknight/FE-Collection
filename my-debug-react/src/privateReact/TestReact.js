import { Component, Fragment } from 'react'

export default class TestReact extends Component {
  render() {
    return (
      <div>
        <h1>Component Page</h1>
        <ul>
          {
            [1, 2, 3].map(i => {
              return <Fragment key={i}>
                <li>minuser</li>
                <li>scireds</li>
              </Fragment>
            })
          }
        </ul>
      </div>
    )
  }
}
