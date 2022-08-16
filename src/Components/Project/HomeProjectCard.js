import './HomeProjectCard.css';


const HomeProjectCard = ({className,image,title,children,reversed,onClick,attributes})=> {
  return (
    <div className={"HomeProjectCard "+className} onClick={()=>onClick()}>
        <div className='ProjectCardImageContainer'>
          <img className="ProjectCardImage" src={image}/>
          <div className="ProjectCardImageOverlay"/>
        </div>
        <div className="ProjectTextContainer">
            <h2 className="HomeProjectCardTitle">{title}</h2>
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

export default HomeProjectCard;
