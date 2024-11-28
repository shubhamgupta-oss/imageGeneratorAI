import React, { useState } from "react";
import './Auth.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { toast } from "react-toastify";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [checkPasswordMatch, setMatchPass] = useState(true);
  const [fnameMsg, setFnameMsg] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [emailInput, setemailInput] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const navigate = useNavigate();
  const dispatch = useDispatch();  

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
    if (name === 'Fname' && value) {
      setFnameMsg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCooldown) return;
    setIsCooldown(true);
  
    // Function to validate inputs
    const validateInputs = () => {
      let isValid = true;
      if (!formData.email) {
        setemailInput(true);
        isValid = false;
      }
      if (!formData.password) {
        setPasswordInput(true);
        isValid = false;
      }
      if (!isLogin && !formData.Fname) { 
        setFnameMsg(true);
        isValid = false;
      }
      return isValid;
    };
  
    if (!validateInputs()) return;
  
    const endpoint = isLogin
      ? `${apiUrl}/api/login`
      : `${apiUrl}/api/register`;
  
    try {
      const response = await axios.post(endpoint, formData);
  
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || (isLogin ? "Login successful!" : "Registration successful!"));
  
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          dispatch(login(response.data.token)); 
        }
        
        navigate("/home");
        
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "User Is Not Register In DB, Or Try after some time");
    } finally {
      setIsCooldown(false);
      setFormData({
        Fname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPasswordInput(false);
      setemailInput(false);
      setFnameMsg(false);
    }
  };
  

  const handleClickMe = () => {
    setIsLogin(!isLogin);
    setFnameMsg(false);
    setMatchPass(true);
  };

  function checkPassword(e) {
    const { value } = e.target;

    setFormData({
      ...formData,
      confirmPassword: value
    });

    if (formData.password === value) {
      setMatchPass(true);
    } else {
      setMatchPass(false);
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
            {fnameMsg && <p style={{ color: 'red' }}>Name is required</p>}

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
        {emailInput && <div style={{ color: 'red' }}>Email is required</div>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
        {passwordInput && <div style={{ color: 'red' }}>Password is required</div>}

        {!isLogin && (
          <>
            <input
              type="password"
              placeholder="Confirm Your Password"
              value={formData.confirmPassword}
              onChange={checkPassword}
            />
            {!checkPasswordMatch && (
              <p style={{ color: 'red' }}>Passwords do not match</p>
            )}
          </>
        )}

        <div className="notemsg">
          {isLogin ? (
            <>
              If not registered,{" "}
              <span onClick={handleClickMe} style={{ cursor: "pointer" }}>
                click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={handleClickMe} style={{ cursor: "pointer" }}>
                Click me
              </span>
            </>
          )}
        </div>

        <button className="submitHandel">
        {isCooldown ? (
          "Wait..."
        ) : (
          <>
            <AutoAwesomeIcon /> {isLogin ? "Login" : "Register"}
          </>
        )}
      </button>

      </form>
    </div>
  );
};

export default AuthForm;
