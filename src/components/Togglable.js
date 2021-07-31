import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
              { props.buttonLabel === 'View' ?
                <button onClick={toggleVisibility}> Hide </button> : ''
            }
            {props.children} 
            {props.buttonLabel !== 'View' ?
                <button onClick={toggleVisibility}>Cancel</button> : ''
            }
            </div>
        </>
    )
})

export default Togglable