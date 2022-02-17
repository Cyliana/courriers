import React,{useState} from 'react';
import'./FieldInput.css'


const FieldInput = (props) => {

    const [value, setValue] = useState(props.value);

    const update = (e) =>
    {
        if (props.onChange) 
        {
            props.onChange(e);
        }
        setValue(e.target.value);
    }


    return (
        <div className="fieldInput">
            <label>{props.label}</label>
            <input type={props.type} name={props.id} id={props.id} value={value} onChange={update} />
        </div>
    );
}

export default FieldInput;
