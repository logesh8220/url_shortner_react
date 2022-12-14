import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { env } from '../Config'

function Login() {
  const navigate = useNavigate()
  const [isloading,setloading] = useState(false)
  const formik = useFormik({
    initialValues:{
      Email:"",
      Password:"",
    },
    onSubmit: async (values)=>{
      try {
        setloading(true)
        let logindata = await axios.post(`${env.api}/login`,values)
        if(!logindata.status === 200){
          alert("UserNot Available")
        }else{
          window.localStorage.setItem("app_token",logindata.data.token)
          setloading(false)
          console.log(logindata)
          navigate(`/urlshortner/${logindata.data.Name}`)
          toast.info(`Welcome ${logindata.data.Name}`,{
            position: "bottom-center",
            className:"tost-class"
           })
          
        }

      } catch (error) {
        console.log(error)
        toast.info("Somthing Wrong",{
          position: "bottom-center",
          className:"tost-class"
         })
      }
    }
  })
  return (
    // <div><Link to={'/urlshortner'}>Login</Link></div>
   <div className='container text'>
    {
      isloading?
    <div class="text-center">
    <div class="spinner-border" role="status"  style={{width: "3rem", height: "3rem" ,color:'#1eab9b',marginTop:"50%"}}>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>:
    <form className='login_div col-6 offset-3' onSubmit={formik.handleSubmit}>
      <div className='text-center p-5'>Welcome</div>
        <lable  className="form-label">Email</lable>
        <input type="text" name='Email' onChange={formik.handleChange} value={formik.values.Email} className='form-control login_i'></input>
        <lable  className="form-label">Password</lable>
        <input type="password" name='Password'  onChange={formik.handleChange} value={formik.values.Password}  className='form-control login_i'></input>
        <button type='submit' className=' col-12 login_i'>Login</button>
        <div className='text-center'><Link className='link_auth' to={"/forgot"}>Forgot password ?</Link></div>
        <div className='text-center'><Link to={'/signup'}>Create New Account</Link></div>
    </form>
    }
   </div>

  )
}

export default Login