import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'

function ProtectedRout() {
  return (
    window.localStorage.length>0?<Outlet/>:<Login/>
  )
  
}

export default ProtectedRout
console.log(window.localStorage.length>0)