import { useState } from 'react';
import './Contact.css';
import Input from '../../FormElements/Input';
import TextArea from '../../FormElements/TextArea';
import SimpleButton from '../../Buttons/SimpleButton/SimpleButton';

const Contact = ()=> {
  const [FullName,setFullName] = useState(null);
  const [Email,setEmail] = useState(null);
  const [Title,setTitle] = useState(null);
  const [Message,setMessage] = useState(null);

  const SubmitForm = () =>{

  }



  return (
    <div className="Contact">
      <div className='SocialMedia_Bar'>
          <a href="https://github.com/bogdangosa" target="_blank"><img src="/social_media/github-icon-fill.svg" alt="...." className='SocialMedia_Icon'/></a>
          
          <a href="https://www.instagram.com/bogdan_gosa/" target="_blank"><img src="/social_media/instagram-icon.svg" alt="...." className='SocialMedia_Icon'/></a>
          
          <a href="https://www.linkedin.com/in/bogdan-gosa-5bb97a224/" target="_blank"><img src="/social_media/linkedin-icon.svg" alt="...." className='SocialMedia_Icon'/></a>
          
          <img src="/social_media/facebook-icon.svg" alt="...." className='SocialMedia_Icon'/>
      </div>
      <div className='ContactForm'>
          <h2>Contact</h2>
          <p className="Text">You can contact me through social media or by filling out the form below</p>
          <div className="TopContact">
            <Input value={FullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name"/>
            <Input value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
          </div>
          <Input value={Title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>

          <TextArea rows={6} value={Message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message"/>

          <SimpleButton className="SubmitButton" onClick={()=>SubmitForm()}>Submit</SimpleButton>
          
      </div>


    </div>
  );
}

export default Contact;
