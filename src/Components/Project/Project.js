import './Project.css';


const Project = ({className,image,title,children,reversed,onClick,attributes})=> {
  return (
    <div className={reversed ?"Project Project_Reversed ":"Project "} onClick={()=>onClick()}>
        <div className='ProjectImageContainer'>
          <img className="ProjectImage" src={image}/>
          <div className="ProjectImageOverlay"/>
        </div>
        <h2 className="ProjectTitle">{title}</h2>
        <div className={reversed ?"ProjectTextCard ProjectTextCard_Reversed":"ProjectTextCard"}>
            <p className="ProjectText"> {children}</p>
            <div className="ProjectAtributes">
                {attributes.map((attribute,index)=>{
                  return <p className="Attribute" key={index}>{attribute}</p>
                })
                }
            </div>
        </div>
    </div>
  );
}

export default Project;
