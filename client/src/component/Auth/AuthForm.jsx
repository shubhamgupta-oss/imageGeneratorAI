import React, { useState } from "react";
import './Auth.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [checkPasswordMatch, setmatchePass] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Fname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For debugging

    // Reset form fields
    setFormData({
      Fname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '' 
    });

    navigate("/home");  // Navigate after submission
  };

  // Handle toggling between login and registration
  const handleClickMe = () => {
    setIsLogin(!isLogin);
  };

  // Password matching function,
  function checkPassword(e) {
    const { value } = e.target;
    
    // Update formData for confirmPassword
    setFormData({
      ...formData,
      confirmPassword: value
    });

    // Check if passwords match
    if (formData.password === value) {
    //   console.log("Passwords match:", value);
      setmatchePass(true);  // Passwords match
    } else {
    //   console.log("Passwords do not match");
      setmatchePass(false);  // Passwords don't match
    }
  }

  return (
    <div className="parentDiv">
      <h1>{isLogin ? "Please Login..." : "Register Yourself . . ."}</h1>
      <form className="formMain" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input 
              type="text"  
              name="Fname"
              value={formData.Fname}
              onChange={handleChange} 
              placeholder="Enter Your Name" 
            />

            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange} 
              placeholder="Enter Your Username" 
            />
          </>
        )}

        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange} 
          placeholder="Enter your email" 
        />

        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange} 
          placeholder="Enter your Password" 
        />

        {!isLogin && (
          <>
            <input 
              type="password" 
              placeholder="Confirm Your Password" 
              value={formData.confirmPassword}
              onChange={checkPassword} 
            />
            {!checkPasswordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}  {/* Display error message if passwords don't match */}
          </>
        )}

        <div className="notemsg"> 
          {isLogin ? 
            <>If not registered, <span onClick={handleClickMe} style={{ cursor: 'pointer' }}>click here</span></> 
            : <>Already have an account? <span onClick={handleClickMe} style={{ cursor: 'pointer' }}>Click me</span></>}
        </div>

        <button className="submitHandel"> 
          <AutoAwesomeIcon /> {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
