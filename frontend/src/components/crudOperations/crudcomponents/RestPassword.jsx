import React, { useState } from 'react'
import "./resetpassword.css"
import axios from 'axios';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const RestPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate=useNavigate()
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (!email || !newPassword || !confirmPassword) {
        setError('Please fill out all fields.');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        setPasswordError('Passwords do not match.');
        return;
      }
  
      // Additional password validation (e.g., length, strength)
      if (newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        return;
      }
  
      
      // Handle the password reset logic, such as calling an API
      try {
        const {data}= await axios.put("http://localhost:8090/api/resetpassword",{email,newPassword})
      console.log(data);
      setIsSubmitted(true);
      setError('');
      toast.success(data.message,{position:"top-right"})
      setPasswordError('');
      setTimeout(()=>{
      navigate("/login")
      },3000)
      } catch (error) {
        setError(error.response.data.message)
      }
    };
  
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h2 className="title">Reset Your Password</h2>
          {isSubmitted ? (
            <div className="success-message">
              <p>Your password has been successfully reset!</p>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
  
              <div className="input-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                />
              </div>
  
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                />
              </div>
  
              {error && <p className="error-text">{error}</p>}
              {passwordError && <p className="error-text">{passwordError}</p>}
  
              <button type="submit" className="submit-button">Reset Password</button>
            </form>
          )}
        </div>
      </div>
    );
}

export default RestPassword