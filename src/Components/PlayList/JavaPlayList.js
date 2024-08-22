import React from 'react'
import Javapart1 from '../Assets/Javapart1.jpg';
import '../Styles.css'
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

function JavaPlayList({ userRole }) {
   const navigate = useNavigate()
   const goToWatchVideo = () => {
      navigate('/watchvideo');
    };

    const uploadVideo = () => {
      console.log("Upload video button clicked");
    }

  return (
    <div>
       
   <body>
  

<section class="playlist-details">

<h1 class="heading">playlist details</h1>

<div class="row">

   <div class="column">

      <div class="thumb">
         <img src={Javapart1} alt="" />
         {/* <span>10 videos</span> */}
      </div>
   </div>
   <div class="column">

      <div class="details">
         <h3>complete JAVA tutorial</h3>
         <p>Our Java tutorial has been written for beginners to advanced programmers who are striving to learn Java Programming. We have provided numerous practical examples to explain the concepts in simple and easy steps. This tutorial has been prepared and reviewed by experienced Java Programmers</p>
      </div>
   </div>
</div>

</section>

<section class="playlist-videos">

{/* <h1 class="heading">playlist videos</h1> */}

<div className="heading-container">
            <h1 className="heading">Playlist Videos</h1>
            {userRole === "ADMIN" && (
              <button className="upload-button" onClick={uploadVideo}>
                Upload Video
              </button>
            )}
          </div>


<div class="box-container">

   <button class="box" onClick={() => goToWatchVideo()}>
      <i class="fas fa-play"></i>
      <img src={Javapart1} alt=""/>
      <h3>complete JAVA tutorial (part 01)</h3>
   </button>

     <div className="box" onClick={goToWatchVideo}>
     <div className="player-wrapper">
                  <ReactPlayer
                  className="react-player"
                     url="https://www.youtube.com/watch?v=VIDEO_ID"
                     light={true}
                     playing={false}
                     width="100%"
                     height="100%"
                     playIcon={<i className="fas fa-play play-icon" />}
                    
                  />
                   <div className="progress-bar" style={{ width: '30%' }} ></div>
                   </div>
                  <h3>complete JAVA tutorial (part 02)</h3>
               </div>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={Javapart1} alt="" />
      <h3>complete JAVA tutorial (part 03)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={Javapart1} alt="" />
      <h3>complete JAVA tutorial (part 04)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={Javapart1} alt="" />
      <h3>complete JAVA tutorial (part 05)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={Javapart1} alt=""/>
      <h3>complete JAVA tutorial (part 06)</h3>
   </a>

</div>

</section>
<footer class="footer">

&copy; copyright @ 2024 by <span>ManthaTech Solutions</span> | all rights reserved!

</footer>   
</body>   
    </div>
  )
}

export default JavaPlayList
