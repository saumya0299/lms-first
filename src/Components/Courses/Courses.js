import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles.css'
import java from '../Assets/java.jpg';
import aws1 from '../Assets/aws1.jpg'
import devops from '../Assets/devops.jpg'
import html from '../Assets/html.png'


function Courses({ isLoggedIn, userCourses, userRole }) {

    const navigate = useNavigate()


 const goToJavaPlaylist = (course) => {
  if (isLoggedIn){
  if (userRole === "ADMIN" || userCourses.includes(course)) {
    navigate("/javaplaylist");
  } else {
    window.alert(`You don't have access to the ${course} course.`);
   }
  }
   else {
    navigate('/login');
  }
 };

 // awsplaylist

 const goToAwsPlaylist = (course) => {
  if (isLoggedIn){
    if (userRole === "ADMIN" || userCourses.includes(course)) {
      navigate("/awsplaylist");
    } else {
      window.alert(`You don't have access to the ${course} course.`);
     }
    }
     else {
      navigate('/login');
    }
 };

 // devopsplayList

 const goToDevopsPlaylist = (course) => {
  if (isLoggedIn){
    if (userRole === "ADMIN" || userCourses.includes(course)) {
      navigate("/devopsplayList");
    } else {
      window.alert(`You don't have access to the ${course} course.`);
     }
    }
     else {
      navigate('/login');
    }
 };

 // htmlplaylist

 const goToHtmlPlaylist = (course) => {
  if (isLoggedIn){
    if (userRole === "ADMIN" || userCourses.includes(course)) {
      navigate("/htmlplaylist");
    } else {
      window.alert(`You don't have access to the ${course} course.`);
     }
    }
     else {
      navigate('/login');
    }
 };

  return (

<>

    
   <body>
<section class="courses">

   {/* <h1 class="heading">Our courses</h1> */}

   <div class="box-container">

      <div class="box">
        
         <div class="thumb">
            <img src={java} alt=""/>
            {/* <span>10 videos</span> */}
         </div>
         <h3 class="title">Complete JAVA tutorial</h3>
         <button class="inline-btn" onClick={()=> goToJavaPlaylist("Java")}>view playlist</button>
      </div>

      <div class="box">
         
         <div class="thumb">
            <img src={aws1} alt="" />
            {/* <span>10 videos</span> */}
         </div>
         <h3 class="title">Complete AWS tutorial</h3>
         <button class="inline-btn" onClick={()=> goToAwsPlaylist("AWS")}>view playlist</button>
      </div>
      <div class="box">
         
         <div class="thumb">
            <img src={devops} alt="" />
            {/* <span>10 videos</span> */}
         </div>
         <h3 class="title">Complete DevOps tutorial</h3>
         <button class="inline-btn" onClick={()=> goToDevopsPlaylist("Devops")}>view playlist</button>
      </div>

      <div class="box">
         
         <div class="thumb">
            <img src={html} alt="" />
            {/* <span>10 videos</span> */}
         </div>
         <h3 class="title">Complete HTML tutorial</h3>
         <button  class="inline-btn" onClick={()=> goToHtmlPlaylist("Html")}>view playlist</button>
      </div>
</div>
      </section>
               
               
 <footer class="footer">

&copy; copyright @ 2024 by <span>ManthaTech Solutions</span> | all
rights reserved!

</footer>              

</body>

</>

      

  )
}

export default Courses
