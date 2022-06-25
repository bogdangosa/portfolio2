import { useState } from 'react';
import './BurgerButton.css';


const BurgerButton = (props)=> {

  return (
    <div className={props.menuState?"BurgerButton":"BurgerButton ClosedBurgerButton"} onClick={()=>props.updateMenu()}>
        <div className="burger_line burger_line1"></div>
        <div className="burger_line burger_line2"></div>
        <div className="burger_line burger_line3"></div>

    </div>
  );
}

export default BurgerButton;
