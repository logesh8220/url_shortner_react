import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { env } from '../Config'

function Reset() {
    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    const formik = useFormik({
      initialValues:{
        Password:"",

      },
      onSubmit: async (values)=>{
        try {
          await axios.put(`${env.api}/${params.userid}/${params.token}`,values)
          toast.info("Password resetted Succesfully",{
            position: "bottom-center",
           className:"tost-class"
          })
          navigate('/login')
        } catch (error) {
          console.log(error)
        }
      }
    })
  return (
    <div className='container text'>
    <form className='login_div col-6 offset-3' onSubmit={formik.handleSubmit}>
        <lable  className="form-label">Password</lable>
        <input type="password" name='Password'  onChange={formik.handleChange} value={formik.values.Password}  className='form-control login_i'></input>
        <lable className="form-label">ConfirmPassword</lable>
        <input type="string" name='ConfirmPassword'  onChange={formik.handleChange} value={formik.values.Password}  className='form-control login_i'></input>
        <button type='submit' className=' col-12 login_i'>Reset</button>

    </form>
   </div>
  )
}

export default Reset