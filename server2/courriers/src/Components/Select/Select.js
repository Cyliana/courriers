import React from 'react';
import { v4 } from 'uuid';


const Select = (props) => {

    //console.log(props.options.length);
    return (
        <div>
            <label>{props.label} :</label>
            <div>{props.selected}</div>
            <select id={props.id} key={v4()} defaultValue={props.selected} name={props.id}>
                {
                props.options.map((choix) =>
                    <option key={v4()} value={choix[0]}>{choix[1]}</option>
                    )}
           </select>
        </div>
    );
 }

export default Select;
