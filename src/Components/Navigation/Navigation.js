import './Navigation.css';
import {AnimatePresence ,motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const Navigation = (props)=> {
  return (
    <div className="Navigation">
          {props.data_links.map((linkdata,index)=>{
            return <NavLinkCard delay={0.3*index} key={index} link={linkdata.link} onClick={()=>props.closeMenu()}>{linkdata.name}</NavLinkCard>
          })}
    </div>
  );
}

const NavLinkCard = (props)=>{
  const Variants = {
    in: {
        opacity:1,
        x:"0"
    },
    out: {
        opacity:0,
        x: "100vw"
    }
  }
  const Transition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.4,
      delay: props.delay
  }

  return (
    <motion.div className="NavLinkCard"
    key={props.key}
    initial="out"
    animate="in"
    exit="out"
    variants={Variants}
    transition={Transition}
    onClick={()=>props.onClick()}>
        <Link to={props.link} className="NavLinkCardText">{props.children}</Link>
    </motion.div>
  );
}

export default Navigation;


/*
motion.div className="NavLinkCard"
    initial="out"
    animate="in"
    exit="out"
    variants={Variants}
    transition={Transition}
    onClick={()=>props.onClick()}*/