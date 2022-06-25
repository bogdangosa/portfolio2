import SimpleButton from '../../Buttons/SimpleButton/SimpleButton';
import Project from '../../Project/Project';
import './Home.css';
import { useNavigate  } from "react-router-dom";
import { openInNewTab } from '../../../utils/utils';

const Home = ()=> {
    const navigate = useNavigate();

    const seeResume = () =>{

    }
    const goDown = () =>{

    }

  return (
    <div className="Home">
        <div className="HomeLandingScreen">
            <h1 className="TitleLandingScreen">Hi, I’m Bogdan</h1>
            <p className="HomeText TextLandingScreen">I am a creative and hard-working 
                web developer.</p>
            <SimpleButton onClick={()=>seeResume()}>See Resume</SimpleButton>
            <img className="arrow_down" onClick={()=>goDown()} src="/arrow-down.png" alt="arrow"/>
        </div>
        <div className="HomeProjectsSection">
            <h2>Projects</h2>
            <Project attributes={new Array("React","Framer Motion","Neflify","React-Router","CSS")} onClick={()=>openInNewTab("https://pedantic-nightingale-faa67d.netlify.app")} reversed={false} image="/project_images/space_page.png" title="Space Page">This is a project about a fictional space page. The design and idea is from frontend-mentor. I used React JS to build this, adding some cool animations using Framer-Motion. This was a very good learning project.</Project>
            <Project attributes={new Array("React","Weather API","Neflify","CSS")} onClick={()=>openInNewTab("https://reverent-mestorf-315e24.netlify.app")} reversed={true} image="/project_images/weather_app.png" title="Weather App">Morbi congue molestie cursus. Duis in auctor felis, sed facilisis mi. Mauris enim enim, tincidunt eget varius in, pellentesque et dolor. Pellentesque laoreet lacus sit amet sapien consectetur fermentum.</Project>
            <Project attributes={new Array("HTML","API","Responsive")} onClick={()=>openInNewTab("https://bogdangosa.github.io/Shortly-URL/")} reversed={false} image="/project_images/shortly_url.png" title="Shortly URL">Morbi congue molestie cursus. Duis in auctor felis, sed facilisis mi. Mauris enim enim, tincidunt eget varius in, pellentesque et dolor. Pellentesque laoreet lacus sit amet sapien consectetur fermentum.</Project>
            
        </div>
        <div className="HomeAboutSection">
            <h2>About Me</h2>
            <div className="HomeAboutContect">
                <p className="HomeText HomeAboutText">Etiam vitae laoreet diam. Quisque quis accumsan ligula. Quisque leo metus, lobortis blandit erat non, sodales efficitur est. Nulla dictum vulputate nulla, at fermentum turpis lacinia quis. Vestibulum nec vehicula massa. Vestibulum in commodo sem. Quisque tincidunt lectus leo, a dignissim sapien sollicitudin ut. Nullam in ipsum vitae massa hendrerit placerat eu quis est. Aliquam a mollis nisi.<br/><br/> Vestibulum ultricies sollicitudin commodo. Donec ac nisl id lorem dapibus porta. Fusce nisl ipsum, molestie pulvinar dui eget, blandit pharetra augue. Duis aliquet felis vel diam rhoncus consequat. Suspendisse bibendum enim vitae sapien egestas, nec facilisis arcu pellentesque. Nulla sem arcu, consequat non pulvinar in, placerat faucibus metus. Nam auctor metus in tempus fermentum. Maecenas lobortis dui neque, sit amet laoreet ipsum scelerisque vitae. Nunc luctus molestie nisi, in iaculis arcu blandit eu. Suspendisse viverra accumsan enim elementum tincidunt. Nam massa diam, porta et tempor eget, posuere sit amet massa. Nulla rutrum eu justo eget blandit. Aenean commodo porta bibendum. Sed tempor eleifend sem in mollis.</p>
                <div className="ImageContainer">
                    <img className="Image" src="/profile_image.png"/>
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
