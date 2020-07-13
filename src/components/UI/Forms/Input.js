import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.invalid);
    }


    switch (props.elementType){
        case('input'):
        inputElement= <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}   onChange={props.change}/>;        
        break;

        case('textarea'):
        inputElement= <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}   onChange={props.change}/>;
        break;   
        
        case('select'):
        inputElement= (
        <select className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.change}>
                {props.elementConfig.option.map(option=> (
                    <option value={option.value} key={option.value}  >
                        {option.displayValue}
                    </option>
                ))}
           </select>
        
        );
        break;   
        
        default: 
        inputElement= <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;       
        break;        
        
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>
                {props.label}    
            </label>
            {inputElement}
        </div>
    );
}
export default Input;