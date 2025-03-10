import React from 'react'
import Cnavbar from './Cnavbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const Cdashboard = ({islogin,setIslogin}) => {
  return (
    <div className='dashboard'>
        <Cnavbar islogin={islogin} setIslogin={setIslogin} />
        <Outlet/>
        <ToastContainer/>
    </div>
  )
}

export default Cdashboard