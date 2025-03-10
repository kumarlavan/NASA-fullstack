import React, { useState } from 'react'
import "./crudoperations.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cdashboard from './crudcomponents/Cdashboard'
import Cregister from './crudcomponents/Cregister'
import Clogin from './crudcomponents/Clogin'
import UserDashboard from './crudcomponents/UserDashboard'
import Cupdate from './crudcomponents/Cupdate'
const CrudHome = () => {
    const[islogin,setIslogin]=useState(false)
    const route=createBrowserRouter([
        {
            path:"/",
            element:<Cdashboard />,
            children:[
                {
                    path:"/register",
                    element:<Cregister/>
                },
                {
                    path:"/login",
                    element:<Clogin />
                },
                {
                    path:"/dashboard",
                    element:<UserDashboard/>
                },
                {
                    path:"/updateuser/:slug",
                    element:<Cupdate/>
                }
            ]
        }
    ])
  return <RouterProvider router={route}/>
}

export default CrudHome