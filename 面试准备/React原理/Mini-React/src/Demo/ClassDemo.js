import React, { Component } from 'react'

export default class ClassDemo extends Component {
    constructor (props) {
        super(props)
        const data = []
        for (let i = 0; i < 10000; i++) {
            data.push(i)
        }
        this.state = {
            data
        }
    }

    render() {
        return (
            <div style={{ height: '600px' }}>
                <h2>class 组件</h2>
                {
                    this.state.data.map(name => {
                        return <p key={name} style={{ height: 10 }}>{name}</p>
                    })
                }
            </div>
        )
    }
}
