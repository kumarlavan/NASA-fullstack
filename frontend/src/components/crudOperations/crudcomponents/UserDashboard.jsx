import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import UserCard from './UserCard'
import "./userdashboard.css"
import { toast } from 'react-toastify'
const UserDashboard = () => {
  const [dbdata,setDbdata]=useState([])
  
const fdata=async()=>{
  const token=localStorage.getItem("verification_token")
  const {data:{message,result}}= await axios.get("http://localhost:8090/api/users",{
    headers:{'Authorization':`Bearer ${token}`}
  })
  setDbdata(result)
}


  const deleteuser=(id)=>{
    const result=axios.delete(`http://localhost:8090/api/deleteuser/${id}`)
        result.then((data)=>{
            console.log(data);
            fdata()
            toast.success("deletion Successfully",{position:"top-right"})
        }).catch((err)=>{
            console.log(err);  
        })
  }

  useEffect(()=>{
    fdata()
  },[])
  console.log(dbdata);
  return (
    <div className='userdashboard'>
      {
        dbdata.map((user,index)=>{
          return(
            <Fragment key={index+1}>
             <UserCard {...user} deleteuser={deleteuser}/>
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default UserDashboard