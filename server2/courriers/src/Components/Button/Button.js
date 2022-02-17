import React from 'react';
import './Button.css'

const Button = (props) => {
    return (
        <input className='button' type={props.type} value={props.value}/>
    );
}

export default Button;
