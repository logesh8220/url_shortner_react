import React from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from './Login'

function ProtectedRout() {
  return (
    window.localStorage.length>0?<Outlet/>:<Login/>
  )
  
}

export default ProtectedRout
if(window.localStorage.length>0){
  toast.info(`Session expired`,{
    position: "bottom-center",
    className:"tost-class"
   })
}
console.log(window.localStorage.length>0)