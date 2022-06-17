import React, { Component } from 'react'

export default class ErrorBound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError (error) {
        return { hasError: true }
    }
    render() {
        if (this.state.hasError) {
            return <p>服务开小差了！！！</p>
        }
        return this.props.children
    }
}
