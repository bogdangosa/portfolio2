import { useState } from 'react';
import './TextArea.css';


const TextArea = (props)=> {

  return (
    <textarea className={"TextArea "+props.className} rows={props.rows} value={props.value} onChange={(e)=>props.onChange(e)} placeholder={props.placeholder}></textarea>
  );
}

export default TextArea;
