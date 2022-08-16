import { useRef } from 'react';
import SimpleButton from '../../Buttons/SimpleButton/SimpleButton';
import Project from '../../Project/Project';
import './Home.css';
import { useNavigate  } from "react-router-dom";
import { openInNewTab } from '../../../utils/utils';
import {AnimatePresence ,motion} from 'framer-motion'
import HomeProjectCard from '../../Project/HomeProjectCard';

const Home = ()=> {
    const navigate = useNavigate();
    const ProjectsTitleRef = useRef(null);

    const Variants = {
        in: {
            opacity:1,
            y:"0"
        },
        out: {
            opacity:0,
            y: "-100vw"
        }
      }
      const TransitionTitle = {
          type: "tween",
          ease: "anticipate",
          duration: 1.5,
          delay: 0.7
      }
      const TransitionSubTitle = {
        type: "tween",
        ease: "anticipate",
        duration: 1.5,
        delay: 0.5
    }
    const TransitionResume = {
        type: "tween",
        ease: "anticipate",
        duration: 1.5,
        delay: 0.3
    }
    


  return (
    <div className="Home">
        <div className="HomeLandingScreen">
            <motion.h1 
            initial="out"
            animate="in"
            exit="out"
            variants={Variants}
            transition={TransitionTitle}
            className="TitleLandingScreen">Hi, I’m Bogdan</motion.h1>
            <motion.p 
            initial="out"
            animate="in"
            exit="out"
            variants={Variants}
            transition={TransitionSubTitle}
            className="HomeText TextLandingScreen">I am a creative and hard working 
                web developer.</motion.p>
            <motion.a 
             initial="out"
             animate="in"
             exit="out"
             variants={Variants}
             transition={TransitionResume}
            href={process.env.PUBLIC_URL+'/Resume 1.0.pdf'} download="Resume 1.0.pdf"><SimpleButton>See Resume</SimpleButton></motion.a>
            <img className="arrow_down" onClick={() => ProjectsTitleRef.current.scrollIntoView()} src="/arrow-down.png" alt="arrow"/>
        </div>
        <div className="HomeProjectsSection">
            <h2 ref={ProjectsTitleRef}>Projects</h2>
            <HomeProjectCard attributes={new Array("React","Framer Motion","Neflify","React-Router","CSS")} onClick={()=>openInNewTab("https://pedantic-nightingale-faa67d.netlify.app")} reversed={false} image="/project_images/space_page.png" title="Space Page">This is a project about a fictional space page. The design and idea is from frontend-mentor. I used React JS to build this, adding some cool animations using Framer-Motion. This was a very good learning project.</HomeProjectCard>
            <HomeProjectCard attributes={new Array("React","Weather API","Neflify","CSS")} onClick={()=>openInNewTab("https://reverent-mestorf-315e24.netlify.app")} reversed={true} image="/project_images/weather_app.png" title="Weather App">           I created a website that displays the data from OpenWeather API,thus you can see the weather from your location, it even shows it from 3 to 3 hours. In this project I learnt React JS and working with an API.</HomeProjectCard>
            <HomeProjectCard attributes={new Array("Next Js","AWS","Auth0","Flask")} onClick={()=>{}} reversed={false} image="/project_images/thinkup_platform.png" title="ThinkUp Platform">           Me and a team of very talented students developed a platoform for Think-Up Academy.This project includes authentication, working with and creating an API and a lot of teamwork. While beeing only 2 people on the front-end i did the vast majority of the interface.</HomeProjectCard>
            <HomeProjectCard attributes={new Array("Next Js","Pexels API","Vercel","CSS")} onClick={()=>openInNewTab("https://image-galery.vercel.app/")} reversed={true} image="/project_images/image_galery.png" title="Image Galery">Morbi congue molestie cursus. Duis in auctor felis, sed facilisis mi. Mauris enim enim, tincidunt eget varius in, pellentesque et dolor. Pellentesque laoreet lacus sit amet sapien consectetur fermentum.</HomeProjectCard>

            
            <Project attributes={new Array("React","Framer Motion","Neflify","React-Router","CSS")} onClick={()=>openInNewTab("https://pedantic-nightingale-faa67d.netlify.app")} reversed={false} image="/project_images/space_page.png" title="Space Page">This is a project about a fictional space page. The design and idea is from frontend-mentor. I used React JS to build this, adding some cool animations using Framer-Motion. This was a very good learning project.</Project>
            <Project attributes={new Array("React","Weather API","Neflify","CSS")} onClick={()=>openInNewTab("https://reverent-mestorf-315e24.netlify.app")} reversed={true} image="/project_images/weather_app.png" title="Weather App">           I created a website that displays the data from OpenWeather API,thus you can see the weather from your location, it even shows it from 3 to 3 hours. In this project I learnt React JS and working with an API.</Project>
            <Project attributes={new Array("Next Js","AWS","Auth0","Flask")} onClick={()=>{}} reversed={false} image="/project_images/thinkup_platform.png" title="ThinkUp Platform">           Me and a team of very talented students developed a platoform for Think-Up Academy.This project includes authentication, working with and creating an API and a lot of teamwork. While beeing only 2 people on the front-end i did the vast majority of the interface.</Project>
            <Project attributes={new Array("Next Js","Pexels API","Vercel","CSS")} onClick={()=>openInNewTab("https://image-galery.vercel.app/")} reversed={true} image="/project_images/image_galery.png" title="Image Galery">Morbi congue molestie cursus. Duis in auctor felis, sed facilisis mi. Mauris enim enim, tincidunt eget varius in, pellentesque et dolor. Pellentesque laoreet lacus sit amet sapien consectetur fermentum.</Project>

        </div>
        <div className="HomeAboutSection">
            <h2>About Me</h2>
            <div className="HomeAboutContect">
                <p className="HomeText HomeAboutText">
                    Hi! I’m Bogdan Gosa and I am a passionate and enthusiastic Front-end Developer.
                    <br/><br/> I am a consistent learner, seeing every day as an opportunity to learn something new. I also put high emphasis on clean code, so you can expect a well written code source.
                    <br/><br/>I'm interested in working with amazing people on their ambitious projects.
                </p>
                <div className="ImageContainer">
                    <img className="Image" src="/profile_image_me.png"/>
                </div>
            </div>
        </div>
        <div className="HomeContactSection">
            <h2>Contact</h2>
            <p className="HomeContactText">Fell free to contact me for more information and I’ll respond as soon as I can</p>
            <SimpleButton onClick={()=>navigate('/Contact')}>Say hi</SimpleButton>
        </div>
    </div>
  );
}

export default Home;
