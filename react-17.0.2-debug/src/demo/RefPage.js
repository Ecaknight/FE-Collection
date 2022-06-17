
import { createRef, Component, forwardRef } from 'react';

export default class RefPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 0,
            age: '',
        }

        this.ageRef = createRef()
        this.nameRef = createRef()
        this.pwRef = createRef()
        this.heightRef = createRef()
    }

    componentDidMount() {
        console.log(this.ageRef.current.focus())
        setTimeout(() => {
            this.ageRef.current.value = 20
        }, 1000)
    }

    submit = () => {
        const age = this.ageRef.current.value
        const name = this.nameRef.current.getName()
        const pw = this.pwRef.current.value
        const height = this.heightRef.value
        console.log('submit', age, name, pw, height)
    }

    render () {
        const { count } = this.state

        const NewPw = forwardRef(PassWordInput)

        return (
            <div>
                <button >click change count {count}</button>
                {/**类组件中的ref 可以拿到组件的整个方法 */}
                <NameInput ref={this.nameRef} />
                <NewPw ref={this.pwRef} />
                <p>
                    <label>年龄</label>
                    <input ref={this.ageRef} />
                </p>
                <p>
                    <input ref={ele => {
                        this.heightRef = ele
                        console.log('ele', ele)
                    }} />
                </p>
                <br />
                <button onClick={this.submit}>提交</button>
            </div>
        )
    }
}

class NameInput extends Component {
    constructor(props) {
        super(props)
        this.nameInputRef = createRef()
    }

    getName = () => {
        return this.nameInputRef.current.value
    }
    
    render () {
        return (
            <p>
                <label>姓名</label>
                <input ref={this.nameInputRef} />
            </p>
        )
    }
}

function PassWordInput (props, ref) {
    return (
        <p>
            <label>密码</label>
            <input ref={ref} />
        </p>
    )
}
