import './ProjectCard.css';


const ProjectCard = (props)=> {
  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <div className="ProjectCard">
        <img src={props.image_background} alt="." className="ProjectCardBackground"></img>
        <div className='ProjectCardOverlay'/>
        <h3 className="ProjectCardTitle">{props.title}</h3>
        <div className='ProjectCardLinks'>
          {props.link!="none"?<img src="/external-link.svg" alt="...." className='ProjectCardLinkIcon' onClick={()=>openInNewTab(props.link)}/>:<></>}
          {props.github!="none"?<img src="/social_media/github-icon-dark.svg" alt="...." className='ProjectCardLinkIcon' onClick={()=>openInNewTab(props.github)}/>:<></>}
        </div>
    </div>
  );
}

export default ProjectCard;
