import React from 'react';
import '../LoginSignup/Loginsignup.css'; // Create this CSS file for styling if needed
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const Login = ({ setUserRole, setIsLoggedIn, setUserCourses }) => {

    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: '',
    })
    
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate()


    const validate = () => {
      const newErrors = {};
      if (!loginDetail.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(loginDetail.email)) {
        newErrors.email = 'Email address is invalid';
      }
      // else if (!loginDetail.email.endsWith('@manthatech.com')) {
      //   newErrors.email = 'Email domain must be @manthatech.com';
      // }
      if (!loginDetail.password) {
        newErrors.password = 'Password is required';
      }
      return newErrors;
    };

    const goToReset = () => {
      navigate('/reset-password')
    }
        
    const handleChange = (event,field) => {
      let actualValue = event.target.value
      setLoginDetail({
        ...loginDetail,
        [field]:actualValue
      }) 
    }
  
    
    const handleLogin = (event) => {
      event.preventDefault();

      const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
      console.log('Login details:', loginDetail);
    
      axios.post('http://localhost:8080/auth/login', loginDetail)
        .then((response) => {
          const jwtTokenData = response.data;
          console.log('User login response:', jwtTokenData);
          const token = jwtTokenData.token;
          const defaultPassword = jwtTokenData.defaultPassword;
          const role = jwtTokenData.role;
    
          localStorage.setItem('token', token);
          console.log('Token set in local storage:', token);
          console.log('user role:' , role);
    
          setUserRole(jwtTokenData.role);
          setIsLoggedIn(true);
          
        //  window.localStorage.setItem("isLoggedIn", true);

        // Fetch user courses
        axios
          .get(`http://localhost:8080/user/${jwtTokenData.userId}/courses`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((coursesResponse) => {
            const userCourses = coursesResponse.data.registeredCourses.map(course => {
              console.log('Course:', course); // Log each course to inspect its structure
              return course;
            });
            
            setUserCourses(userCourses);
            console.log('Display the user registered courses:', userCourses);

          if (defaultPassword) {
            navigate('/reset-password');
          } else if (role === 'ADMIN') {
            navigate('/Admin');
          } else {
            navigate('/courses');
          }
        })
        .catch((error) => {
          setLoginError('Failed to fetch user courses');
          console.error('Fetch user courses error:', error);
        });
      })
        .catch((error) => {
          setLoginError('Invalid email or password');
          console.error('Login error:', error);
        });
    };
    
    return (
        <div className='container'>
            <div className='header'>
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            
            <div className="inputs">
            {errors.email && (
            <div
              style={{
                color: 'red',
                fontSize: '1.2em',
                marginBottom: '-5px',
              }}
            >
              
              {errors.email}
            </div>
          )}
                <div className="input-group">
                
                    {/* <img src={email_icon} alt="" /> */}
                    <input type="email" placeholder="Email" 
                    value = {loginDetail.email}
                    onChange={(e) =>handleChange(e, 'email')}/>

           

                </div>
                {errors.password && (
            <div
              style={{
                color: 'red',
                fontSize: '1.2em',
                marginBottom: '-5px',
              }}
            >
              {errors.password}
            </div>
          )}
                <div className="input-group">
                    {/* <img src={password_icon} alt="" /> */}
                    <input type="password" placeholder="Password"
                    value = {loginDetail.password}
                     onChange={(e) =>handleChange(e, 'password')} />
                     
                </div>
            </div>
            <br></br>
            {loginError && (
        <div
          style={{
            color: 'red',
            fontSize: '1.6em',
            marginTop: '5px',
          }}
        >
          {loginError}
        </div>
      )}
            <div className="submit-container">
                <div className="submit" onClick={handleLogin}>
                    Login
                    </div>
            </div>
            {/* <div className="forgot-password" >
                Forgot Password? <a href=" " onClick={goToReset}>Click Here</a>
            </div> */}
        </div>
    );
};
export default Login;