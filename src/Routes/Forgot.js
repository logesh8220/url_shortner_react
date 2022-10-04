import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { env } from '../Config'

function Forgot() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      Email:""
    },
    onSubmit: async (values) =>{
      try {
         await axios.post(`${env.api}/forgot`,values)
        navigate('/login')
        toast.info("Reset link sent Successfully to your Email",{
          position: "bottom-center",
         className:"tost-class"
        })
      } catch (error) {
        console.log(error)
      }
    }
    
  })
  return (
    <div className='container text'>
    <form className='login_div col-6 offset-3' onSubmit={formik.handleSubmit}>
        <div className='text-center '>Forgot password</div>
        <lable  className="form-label" >Email</lable>
        <input type="text" name='Email' className='form-control login_i' onChange={formik.handleChange} value={formik.values.Email}></input>
        <button type='submit' className=' col-12 login_i'>Send</button>
    </form>
   </div>
  )
}

export default Forgot