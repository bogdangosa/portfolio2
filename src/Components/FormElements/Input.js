import { useState } from 'react';
import './Input.css';


const Input = (props)=> {

  return (
    <input className={"Input "+props.className} value={props.value} onChange={(e)=>props.onChange(e)} placeholder={props.placeholder}></input>
  );
}

export default Input;
