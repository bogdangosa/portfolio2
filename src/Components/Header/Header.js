import { useState } from 'react';
import BurgerButton from '../Buttons/BurgerButton/BurgerButton';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import {Link} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';


const Header = ()=> {
  const [MenuState,setMenuState] = useState(true);
  return (
    <div className="Header">
        <Link to='/'><h1 className="Logo">BG</h1></Link>
        <BurgerButton menuState={MenuState} updateMenu={()=>setMenuState(!MenuState)}/>
        
        <AnimatePresence exitBeforeEnter={true}>
          {!MenuState && (<Navigation data_links={new Array({name:"Home",link:"/"},{name:"Projects",link:"/Projects"},{name:"About Me",link:"/About"},{name:"Contact",link:"/Contact"})} closeMenu={()=>setMenuState(true)}/>)}
        </AnimatePresence>
    </div>
  );
}

export default Header;
