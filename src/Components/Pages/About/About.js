import './About.css';


const About = ()=> {
  return (
    <div className="About">
        <h2>About</h2>
        <div className='AboutTop'>
            <p className="AboutText">Etiam vitae laoreet diam. Quisque quis accumsan ligula. Quisque leo metus, lobortis blandit erat non, sodales efficitur est. Nulla dictum vulputate nulla, at fermentum turpis lacinia quis. Vestibulum nec vehicula massa. Vestibulum in commodo sem. Quisque tincidunt lectus leo, a dignissim sapien sollicitudin ut. Nullam in ipsum vitae massa hendrerit placerat eu quis est. Aliquam a mollis nisi.<br/><br/> Vestibulum ultricies sollicitudin commodo. Donec ac nisl id lorem dapibus porta. Fusce nisl ipsum, molestie pulvinar dui eget, blandit pharetra augue. Duis aliquet felis vel diam rhoncus consequat. Suspendisse bibendum enim vitae sapien egestas, nec facilisis arcu pellentesque. Nulla sem arcu, consequat non pulvinar in, placerat faucibus metus. Nam auctor metus in tempus fermentum. Maecenas lobortis dui neque, sit amet laoreet ipsum scelerisque vitae. Nunc luctus molestie nisi, in iaculis arcu blandit eu. Suspendisse viverra accumsan enim elementum tincidunt. Nam massa diam, porta et tempor eget, posuere sit amet massa. Nulla rutrum eu justo eget blandit. Aenean commodo porta bibendum. Sed tempor eleifend sem in mollis.</p>
            <div className="ImageContainer">
                <img className="Image" src="/profile_image.png"/>
            </div>
        </div>

    </div>
  );
}

export default About;
