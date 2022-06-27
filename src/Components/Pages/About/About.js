import './About.css';


const About = ()=> {
  return (
    <div className="About">
        <h2>About</h2>
        <div className='AboutTop'>
            <p className="AboutText">Hi! I’m Bogdan Gosa and I am a passionate and enthusiastic Front-end Developer with 2+ years of experience in web development. I am a very hard working individual, and i would also consider myself a good team member.<br/><br/>My story with programming starts from a very young age. My first contact with programming was at school at age 10 when I had a class of programming. I was doing pretty good so my teacher sent me to an excellency class. At age 11 I already got to the national olympiad. At age 14 I got a bronze medal at the national olympiad. Then I started High School, in witch I started OOP, while also being in the robotics team. I tried almost every type of programming, from building small games to app development to programming robots. But after a while I started learning web development and I knew this is what I liked the most, so I started learning. I worked hard to develop my skills and I built some cool projects along the way.</p>
            <div className="ImageContainer">
                <img className="Image" src="/profile_image.png"/>
            </div>
        </div>

    </div>
  );
}

export default About;
