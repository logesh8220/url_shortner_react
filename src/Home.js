import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from './Config'

function Home() {
  const navigateto = useNavigate()
  const formik = useFormik({
    initialValues:{
        full:""
    },
    onSubmit: async (value) =>{
      try {
        navigateto('/login')
         await axios.post(`${env.api}/urlshortner`,value)
      } catch (error) {
        console.log(error)
      }
        
    }
})

  return (
    <>
    <div className='home d-flex flex-column min-vh-100'>
      <nav class="navbar bg-light">
        <div class="container text">
          <h3 class="text ">URL Shortner <i class="bi bi-link-45deg"></i></h3>
          <div>
            <Link to={'/login'} className='btn-li me-5' style={{borderRadius:"2px"}}>Login <i class="bi bi-box-arrow-in-right"></i></Link>
            <Link to={'/signup'} className='btn-li' style={{borderRadius:"2px"}}>SignIn <i class="bi bi-box-arrow-right"></i></Link>
          </div>
        </div>
      </nav>
      <div style={{ height: "100px" }}></div>
      <div className='container overflow-hidden'>
        <div className='row'>
          <div className='col-lg-5 col-sm-12 mt-5 text'>
            <h1>A simple link</h1>
            <h1>but a powerful tool</h1>
            <h1>for <span style={{color:"#1eab9b"}}>Youtubers.</span>!</h1>
            <p>Our tool allows you to seamlessly track your audience with simple and easy-to-remember yet powerful links and 
              provide your customers a unique tailored experience</p>
              <Link type='button' className=' get_start'>Get Start here <i class="bi bi-arrow-down"></i></Link>
          </div>
          <div className='col'>
            <img src='https://24sevensocial.com/app/uploads/2022/05/24SevenSocial-hero-section-shortener.png' className='home-img'></img>
          </div>
        </div>

      </div>

      <form onSubmit={formik.handleSubmit}class="container ">
    <lable for="full" class="sr-only"></lable>
    <input class="col-8 FullUrl" type="text" name='full' id='FullUrl' onChange={formik.handleChange} value={formik.values.full}  placeholder="URL" required/>
    <button type="submit" class=" url-btn col-lg-1 text">Shrink <i class="bi bi-link-45deg "></i></button>
     <div className='col-lg-8  text-center mt-5'>
     <Link type='button'to={"/login"} className=' btn-li'>View  <i class="bi bi-arrow-right"></i></Link>
     </div>
    </form>
    </div>
    <footer className='footer mt-auto'>
          <p className='text text-muted text-center'> <i class="bi bi-c-circle"></i> Made by logan</p>
    </footer>
    </>
  )
}

export default Home