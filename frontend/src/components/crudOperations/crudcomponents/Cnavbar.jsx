import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cnavbar = () => {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("verification_token")
    navigate("/login")
    toast.success("Logged out successfully",{position:"top-center"})
  }

  return (
    <div className='navbar'>
        <div className="leftnav">Logo</div>
        <div className="rightnav">
            <ul>
              {
                localStorage.getItem("verification_token")?<li><button onClick={logout}>Logout</button></li>:<li><Link to='/login'>Login</Link></li>
              }
            
            
            
            </ul>
        </div>
    </div>
  )
}

export default Cnavbar