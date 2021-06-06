import React, { Component } from "react";

export default class RefPage1 extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.pwInputRef = React.createRef();
    this.ageRef = React.createRef();
    this.countryRef = React.createRef();
  }

  onSubmit = () => {
    const name = this.nameRef.current.value;
    const pw = this.pwInputRef.current.getPw();
    const age = this.ageRef.current.value;
    const country = this.countryRef.current.value;

    console.log("submit", name, pw, age, country);
  };

  render() {
    const AgeWithRef = React.forwardRef(AgeInput);
    const HOCCountry = hoc(Country);
    return (
      <div>
        <p>
          姓名: <input ref={this.nameRef} />
        </p>
        <p>
          <PwInput label="密码" ref={this.pwInputRef} />
        </p>
        <p>
          <AgeWithRef label="年龄" ref={this.ageRef} />
        </p>
        <p>
          <BirthInput label="生日" ref={this.birthRef} />
        </p>
        <p>
          <CityInput label="城市" />
        </p>
        <p>
          <HOCCountry label="国家" ref={this.countryRef} />
        </p>
        <p>
          <button onClick={this.onSubmit}>提交</button>
        </p>
      </div>
    );
  }
}

const hoc = (WrapComponent) =>
  React.forwardRef((props, ref) => (
    <WrapComponent {...props} countryRef={ref} />
  ));

function Country(props) {
  return (
    <>
      <label>{props.label}</label>
      <input ref={props.countryRef} />
    </>
  );
}

class PwInput extends Component {
  constructor(props) {
    super(props);
    this.pwRef = React.createRef();
  }

  getPw = () => {
    return this.pwRef.current.value;
  };

  render() {
    return (
      <>
        <label>{this.props.label}</label>
        <input ref={this.pwRef} />
      </>
    );
  }
}

function AgeInput(props, ref) {
  return (
    <>
      <label>{props.label}</label>
      <input ref={ref} />
    </>
  );
}

class BirthInput extends Component {
  constructor(props) {
    super(props);
    this.birthInput = null;
  }

  setRef = (ele) => {
    console.log("setRef");
    this.birthInput = ele; // 将ref引用赋值
  };

  componentDidMount() {
    this.birthInput.value = "123";
    this.birthInput.focus();
  }

  render() {
    return (
      <>
        <label>{this.props.label}</label>
        {/* <input ref={this.setRef} /> */}
        <input
          ref={(ele) => {
            console.log("inner");
            this.birthInput = ele;
          }}
        />
        <button onClick={() => console.log(this.birthInput.value)}>
          click
        </button>
      </>
    );
  }
}

function CityInput(props) {
  const cityRef = React.useRef(null);

  return (
    <>
      <label>{props.label}</label>
      <input ref={cityRef} />
      <button
        onClick={() => {
          console.log(cityRef.current.value);
        }}
      >
        click
      </button>
    </>
  );
}
