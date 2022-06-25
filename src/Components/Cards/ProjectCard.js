import './ProjectCard.css';


const ProjectCard = (props)=> {
  return (
    <div className="ProjectCard">
        <img src={props.image_background} alt="." className="ProjectCardBackground"></img>
        <div className='ProjectCardOverlay'/>
        <h3 className="ProjectCardTitle">{props.title}</h3>
        <img src="/external-link.svg" alt="...." className='ProjectCardLinkIcon'/>
    </div>
  );
}

export default ProjectCard;
