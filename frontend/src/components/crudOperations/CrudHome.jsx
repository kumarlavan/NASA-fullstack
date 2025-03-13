import React, { useState } from 'react'
import "./crudoperations.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cdashboard from './crudcomponents/Cdashboard'
import Cregister from './crudcomponents/Cregister'
import Clogin from './crudcomponents/Clogin'
import UserDashboard from './crudcomponents/UserDashboard'
import Cupdate from './crudcomponents/Cupdate'
import ProtectedRoute from '../helpers/ProtectedRoute'
import RestPassword from './crudcomponents/RestPassword'
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
                    element:<ProtectedRoute>
                        <UserDashboard/>
                    </ProtectedRoute>
                },
                {
                    path:"/updateuser/:slug",
                    element:<ProtectedRoute>
                        <Cupdate/>
                    </ProtectedRoute>
                },
                {
                    path:"/resetpassword",
                    element:<RestPassword/>
                }
            ]
        }
    ])
  return <RouterProvider router={route}/>
}

export default CrudHome