import React , { useState } from 'react'

export default function OtherComponent() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}
