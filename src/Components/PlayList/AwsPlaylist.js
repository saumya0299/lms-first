import React from 'react'
import aws from '../Assets/aws.png';
import '../Styles.css'
import { useNavigate } from 'react-router-dom';

function AwsPlayList({userRole}) {
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
         <img src={aws} alt="" />
         {/* <span>10 videos</span> */}
      </div>
   </div>
   <div class="column">

      <div class="details">
         <h3>complete AWS tutorial</h3>
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
      <img src={aws} alt=""/>
      <h3>complete AWS tutorial (part 01)</h3>
   </button>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={aws} alt="" />
      <h3>complete AWS tutorial (part 02)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={aws} alt="" />
      <h3>complete AWS tutorial (part 03)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={aws} alt="" />
      <h3>complete AWS tutorial (part 04)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={aws} alt="" />
      <h3>complete AWS tutorial (part 05)</h3>
   </a>

   <a class="box" href="watch-video.html">
      <i class="fas fa-play"></i>
      <img src={aws} alt=""/>
      <h3>complete AWS tutorial (part 06)</h3>
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

export default AwsPlayList