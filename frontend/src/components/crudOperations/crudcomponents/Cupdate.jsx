import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cupdate = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        mailId: '',
        gender: '',
        mobileNumber: '',
        imageurl:""
      });
      
      const {slug}=useParams()

      const fetchcurrentuser=async()=>{
            const {data:{currentuser}}= await axios.get(`http://localhost:8090/api/users/${slug}`)
            setFormData(currentuser)
            
      }
      useEffect(()=>{
        fetchcurrentuser()
      },[])
    const navigate=useNavigate()

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      function getPassword(data){
        const {firstName,age,mobileNumber}=data
        return firstName.charAt(0).toUpperCase()+firstName.slice(1)+age+"@"+mobileNumber.slice(-3)
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        const password=getPassword(formData)
        // console.log({...formData,password});
        console.log(formData)
        const result=axios.put(`http://localhost:8090/api/update/${slug}`,{...formData,password},{headers:{"Authorization":`Bearer ${localStorage.getItem("verification_token")}`}})
        result.then((data)=>{
            console.log(data.message);
            toast.success("updation Successfully")
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err);
            
        })

        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            mailId: '',
            gender: '',
            mobileNumber: '',
            imageurl:""
          })
      };


    
  return (
  <div className="register">
      <div className="register-container">
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Update Form</h2>
      
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required/>
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName"  value={formData.lastName} onChange={handleChange} placeholder="Enter your last name"  required/>
      </div>
      
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age" required/>
      </div>
      
      <div className="form-group">
        <label htmlFor="mailId">Email</label>
        <input type="email" id="mailId" name="mailId" value={formData.mailId} onChange={handleChange} placeholder="Enter your email" required/>
      </div>
      
      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === 'Male'}/> Male
          </label>
          <label>
            <input type="radio"name="gender"value="Female"onChange={handleChange}checked={formData.gender === 'Female'}/> Female
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Enter your mobile number" required />
      </div>

      <div className="form-group">
        <label htmlFor="mobileNumber">Image URL</label>
        <input
          type="url" id="imageurl" name="imageurl" value={formData.imageurl} onChange={handleChange} placeholder="Enter your image URL" required />
      </div>
      
      <button type="submit" className="submit-btn">Update</button>
    </form>
  </div>
  </div>
  )
}

export default Cupdate