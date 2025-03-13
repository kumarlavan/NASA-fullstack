import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Clogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const navigate=useNavigate()



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:8090/api/login",{...formData})
      console.log(data)
      if(data.token){
        localStorage.setItem("verification_token",data.token)
        navigate("/dashboard")
      }
      else{
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
   <div className="loginbox">
     <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password"id="password"name="password"value={formData.password}onChange={handleInputChange}placeholder="Enter your password"/>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p style={{marginTop:"10px"}}>Don't have an Account ? <Link to="/register" style={{color:"blue"}}>Click here to Register</Link></p>
        <p style={{marginTop:"10px"}}><Link to="/resetpassword" style={{color:"blue"}}>Forgot Password</Link></p>
      </div>
    </div>
   </div>
  );
};

export default Clogin;
