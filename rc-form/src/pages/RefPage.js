import React, { Component } from 'react'

export default class RefPage extends Component {
  constructor() {
    super()

    this.inputRef = React.createRef()
    this.pwInputRef = React.createRef()
    this.ageRef = React.createRef()
  }

  submit = () => {
    const inputVal = this.inputRef.current.value
    const pwVal = this.pwInputRef.current.getPw()
    const ageRef = this.ageRef.current.value
    console.log('submit', inputVal, pwVal, ageRef)
  }

  render() {
    const AgeInput = React.forwardRef(AgeWithRef)

    return (
      <div>
        <p>
          input框: <input ref={this.inputRef} />
        </p>
        <p>
          <PwInput label="密码" ref={this.pwInputRef} />
        </p>
        <p>
          <AgeInput label="年龄" ref={this.ageRef} />
        </p>

        <p>
          <button onClick={this.submit}>提交</button>
        </p>
      </div>
    )
  }
}

class PwInput extends Component {
  constructor(props) {
    super(props)
    this.pwRef = React.createRef()
  }

  getPw = () => {
    return this.pwRef.current.value
  }

  render() {
    return (
      <>
      <label htmlFor="">{this.props.label}</label>
      <input ref={this.pwRef} />
      </>
    )
  }
}

function AgeWithRef (props, ref) {
  return (
    <>
      <label htmlFor="">{props.label}</label>
      <input ref={ref} />
    </>
  )
}