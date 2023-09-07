import './Projects.css';
import ProjectCard from '../../Cards/ProjectCard'

const Projects = ()=> {
  return (
    <div className="Projects">
      <h2>Projects</h2>
      <div className="ProjectCardsContainer">
        <ProjectCard image_background="/project_images/cope.jpg" title="Let's Cope" link="https://sindhusaraswathybhaskaran.com/index.html" github="none"/>
        <ProjectCard image_background="/project_images/airport.jpg" title="Airport Local Taxis" link="https://www.gweiclub.xyz/" github="none"/>
        <ProjectCard image_background="/project_images/bambook.jpg" title="Bambook" link="none" github="none"/>
        <ProjectCard image_background="/project_images/calmdeer.jpg" title="Calm Deer" link="https://rad-kashata-baf296.netlify.app/" github="https://github.com/bogdangosa/CalmDeer"/> 
        <ProjectCard image_background="/project_images/sindu.png" title="Unmeelana" link="https://sindhusaraswathybhaskaran.com/index.html" github="none"/>
        <ProjectCard image_background="/project_images/denta_health.jpg" title="Denta Health" link="https://idyllic-brioche-74f79d.netlify.app/" github="https://github.com/bogdangosa/Denta-Health"/>
        <ProjectCard image_background="/project_images/gwei.png" title="Gwei Club" link="https://www.gweiclub.xyz/" github="none"/>
        <ProjectCard image_background="/project_images/thinkup_platform.png" title="ThinkUp Platform" link="none" github="none"/>
        <ProjectCard image_background="/project_images/space_page.png" title="Space Page" link="https://pedantic-nightingale-faa67d.netlify.app" github="https://github.com/bogdangosa/SpacePage"/>
        <ProjectCard image_background="/project_images/weather_app.png" title="Weather App" link="https://reverent-mestorf-315e24.netlify.app" github="https://github.com/bogdangosa/WeatherApp"/>
        <ProjectCard image_background="/project_images/shortly_url.png" title="Shortly Url" link="https://bogdangosa.github.io/Shortly-URL" github="https://github.com/bogdangosa/Shortly-URL "/>
        <ProjectCard image_background="/project_images/image_galery.png" title="Image Galery" link="https://image-galery.vercel.app/" github="https://github.com/bogdangosa/ImageGalery"/>
        <ProjectCard image_background="/project_images/micsunel.png" title="Micsunel" link="https://bogdangosa.github.io/MicsunelPortofolio" github="https://github.com/bogdangosa/MicsunelPortofolio"/>
        <ProjectCard image_background="/project_images/blogr.png" title="Blogr" link="https://bogdangosa.github.io/Blogr-landing-page" github="https://github.com/bogdangosa/Blogr-landing-page"/>
        <ProjectCard image_background="/project_images/green_house.png" title="Green House" link="https://bogdangosa.github.io/GreenHouse" github="https://github.com/bogdangosa/GreenHouse"/>
        <ProjectCard image_background="/project_images/sunny_agency.png" title="Sunny Agency" link="https://bogdangosa.github.io/Sunny-agenty-landing-page" github="https://github.com/bogdangosa/Sunny-agenty-landing-page "/>
      </div>

    </div>
  );
}

export default Projects;
