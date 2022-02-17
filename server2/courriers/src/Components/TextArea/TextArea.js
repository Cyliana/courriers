import React from 'react'
import { useState } from 'react'

function TextArea(props) {

    const [value, setValue] = useState(props.value);

    const update = (e) =>
    {
        setValue(e.target.value);
    }


    return (
        <div className="textArea">
            <label>{props.label}</label>
            <textarea name={props.id} id={props.id} value={value} onChange={update} />
        </div>
    );
}

export default TextArea
