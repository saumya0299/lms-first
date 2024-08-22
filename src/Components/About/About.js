import React from 'react';
import About1 from '../Assets/About1.jpg';
import About2 from '../Assets/About2.jpg';
import '../Styles.css'
import {  useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Courses');
};
  return (
    <div>
      
      <section className="about">
        <div className="row">
          <div className="image">
            <img src={About1} alt="About us" />
          </div>
          <div className="content">
            <h3>Learning Management System</h3>
            <p>A learning management system (LMS) or virtual learning environment (VLE) is a software application for the administration, documentation, tracking, reporting, automation, and delivery of educational courses, training programs, materials or learning and development programs
            </p>
            <button className="inline-btn" onClick={handleClick}>Our courses</button>
          </div>
          
          <div className="content">
            <h3>Why choose us?</h3>
            <p>Compared to traditional training methods, creating, managing, and tracking training in the LMS platform saves costs and business hours. Efficient Management – Ensures complete control over the administration, communication, automation between trainers and learners.</p>
          
            <button className="inline-btn" onClick={handleClick} >Our courses</button>
          
          </div>
          <div className="image">
            <img src={About2} alt="About us" />
          </div>
        </div>
      </section>
      <footer className="footer">
        &copy; copyright @ 2024 by <span>ManthaTech Solutions</span> | all
        rights reserved!
      </footer>
    </div>
  );
}

export default About;
