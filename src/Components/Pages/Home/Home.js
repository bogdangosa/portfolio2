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
            href={process.env.PUBLIC_URL+'/Resume.pdf'} download="Resume 1.0.pdf"><SimpleButton>See Resume</SimpleButton></motion.a>
            <img className="arrow_down" onClick={() => ProjectsTitleRef.current.scrollIntoView()} src="/arrow-down.png" alt="arrow"/>
        </div>
        <div className="HomeProjectsSection">
            <h2 ref={ProjectsTitleRef}>Projects</h2>
            <HomeProjectCard attributes={new Array("React","Stripe","Firebase","API",)} onClick={()=>openInNewTab("https://letscope.org")} reversed={true} image="/project_images/cope.jpg" title="Weather App">I’ve worked on the website of this company, Cope. Here I had to implement the login functionality through firebase, a payment processing using stripe that is based on a monthly subscription, as well as a lot of simple presentation pages, some of them fetching data from an API. This was another important step in my development journey, being the first time I’ve worked with payment processing. </HomeProjectCard>
            <HomeProjectCard attributes={new Array("HTML","CSS","JavaScript")} onClick={()=>openInNewTab("https://airportlocaltaxis.com/")} reversed={false} image="/project_images/airport.jpg" title="Airport Local Taxis">I have build a website for a taxi company from London. Although it’s a fairly simple website I’ve learned how to develop a clean and professional website with this project. The website was build on plain HTML CSS and Javascript.</HomeProjectCard>
            <HomeProjectCard attributes={new Array("Next Js","AWS","Auth0","Flask")} onClick={()=>{}} reversed={true} image="/project_images/thinkup_platform.png" title="ThinkUp Platform">My team and I developed a platform for an NGO. The platform is intended to host the projects built by the academy's students, while also allowing mentors to provide feedback to the student.I had to implement an authentication system using auth0 and integrate it inside the Next Js framework. Also me and the team had to create a REST api that covers all CRUD operation, saving the data into dynamodb and S3 for files and images.</HomeProjectCard>
            <HomeProjectCard attributes={new Array("React","API","CSS")} onClick={()=>{}} reversed={true} image="/project_images/bambook.jpg" title="Bambook">I developed a presentational website for an artist.Here i had to create some custom animations using GSAP. It’s a simple and artistic project.</HomeProjectCard>
            
            <Project attributes={new Array("React","Stripe","Firebase","API")} onClick={()=>openInNewTab("https://letscope.org")} reversed={true} image="/project_images/cope.jpg" title="Let's Cope">I’ve worked on the website of this company, Cope. Here I had to implement the login functionality through firebase, a payment processing using stripe that is based on a monthly subscription, as well as a lot of simple presentation pages, some of them fetching data from an API. This was another important step in my development journey, being the first time I’ve worked with payment processing. </Project>
            <Project attributes={new Array("HTML","CSS","JavaScript")} onClick={()=>openInNewTab("https://airportlocaltaxis.com/")} reversed={false} image="/project_images/airport.jpg" title="Airport Local Taxis">I have build a website for a taxi company from London. Although it’s a fairly simple website I’ve learned how to develop a clean and professional website with this project. The website was build on plain HTML CSS and Javascript.</Project>
            <Project attributes={new Array("Next Js","AWS","Auth0","Flask")} onClick={()=>{}} reversed={true} image="/project_images/thinkup_platform.png" title="ThinkUp Platform">My team and I developed a platform for an NGO. The platform is intended to host the projects built by the academy's students, while also allowing mentors to provide feedback to the student.I had to implement an authentication system using auth0 and integrate it inside the Next Js framework. Also me and the team had to create a REST api that covers all CRUD operation, saving the data into dynamodb and S3 for files and images.</Project>
            <Project attributes={new Array("React","API","CSS")} onClick={()=>{}} reversed={true} image="/project_images/bambook.jpg" title="Bambook">I developed a presentational website for an artist.Here i had to create some custom animations using GSAP. It’s a simple and artistic project.</Project>
            
            {/*<Project attributes={new Array("Next Js","Pexels API","Vercel","CSS")} onClick={()=>openInNewTab("https://image-galery.vercel.app/")} reversed={true} image="/project_images/image_galery.png" title="Image Galery">Morbi congue molestie cursus. Duis in auctor felis, sed facilisis mi. Mauris enim enim, tincidunt eget varius in, pellentesque et dolor. Pellentesque laoreet lacus sit amet sapien consectetur fermentum.</Project>*/}

            <SimpleButton  onClick={()=>navigate('/Projects')}>View More</SimpleButton>

        </div>
        <div className="HomeAboutSection">
            <h2>About Me</h2>
            <div className="HomeAboutContect">
                <div>
                    <p className="HomeText HomeAboutText">
                        Hi! I’m Bogdan Gosa and I am a passionate and enthusiastic Front-end Developer.
                        <br/><br/> I am a consistent learner, seeing every day as an opportunity to learn something new. I also put high emphasis on clean code, so you can expect a well written code source.
                        <br/><br/>I'm interested in working with amazing people on their ambitious projects.
                    </p>
                    <SimpleButton onClick={()=>navigate('/About')}>Read More</SimpleButton>
                </div>
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
