import './Projects.css';
import ProjectCard from '../../Cards/ProjectCard'

const Projects = ()=> {
  return (
    <div className="Projects">
      <h2>Projects</h2>
      <div className="ProjectCardsContainer">
        <ProjectCard image_background="/project_images/space_page.png" title="Space Page"/>
        <ProjectCard image_background="/project_images/weather_app.png" title="Weather App"/>
        <ProjectCard image_background="/project_images/shortly_url.png" title="Shortly Url"/>
        <ProjectCard image_background="/project_images/image_galery.png" title="Image Galery"/>
        <ProjectCard image_background="/project_images/thinkup_platform.png" title="ThinkUp Platform"/>
        <ProjectCard image_background="/project_images/micsunel.png" title="Micsunel"/>
        <ProjectCard image_background="/project_images/blogr.png" title="Blogr"/>
        <ProjectCard image_background="/project_images/green_house.png" title="Green House"/>
        <ProjectCard image_background="/project_images/sunny_agency.png" title="Sunny Agency"/>
      </div>

    </div>
  );
}

export default Projects;
