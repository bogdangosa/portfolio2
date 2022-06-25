import { useState } from 'react';
import './SimpleButton.css';


const SimpleButton = (props)=> {

  return (
    <div className={"SimpleButton "+props.className} onClick={()=>props.onClick()}>
        <p>{props.children}</p>
    </div>
  );
}

export default SimpleButton;
