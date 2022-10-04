import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { env } from '../Config'

function Url_Shortner() {
    const [isloading,setloading] = useState(false)
    const params = useParams()
       useEffect(()=>{
           LoadData()
       },[])
 
    const [useurls,seturls] = useState([])
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            full:""
        },
        onSubmit: async (value) =>{
            await axios.post(`${env.api}/urlshortner`,value)
            LoadData()
            
        }
    })
const LoadData = async () =>{
    setloading(true)
    try {
        let data = await axios.get(`${env.api}/urlshortner`,{
            headers:{
                'Authorization' : window.localStorage.getItem("app_token")
            }
        })
        seturls(data.data)
        setloading(false)
        
    } catch (error) {
        console.log(error)
    }

}

function Logout(){
    window.localStorage.clear()
    toast.error(`See You Again ${params.name}`,{
        position: "bottom-center",
        className:"tost-class"
       })
    navigate('/login')
}
 async function deletelink(e){
 
      try {
          let data = await axios.delete(`${env.api}/urlshortner/${e.target.name}`)
          LoadData()
         console.log(data)
      } catch (error) {
        console.log(error)
      }
}
  return (
    <div className='text'> <nav class="text-center url-nav text-light p-2 navbar">
    <div class="container">
        <h1>URL Shortner <i class="bi bi-link-45deg"></i></h1>
        <h5><i class="bi bi-person-circle me-2"></i>{params.name}</h5>
        <Link className='text-light a-text ' onClick={Logout} to={'/'}> Logout <i class="bi bi-box-arrow-left"></i></Link>
    </div>

</nav>
<form onSubmit={formik.handleSubmit}class="container text-center mb-5">
    <lable for="full" class="sr-only"></lable>
    <input class="col-8 FullUrl" type="text" name='full' id='FullUrl' onChange={formik.handleChange} value={formik.values.full}  placeholder="URL" required/>
    <button type="submit" class=" url-btn col-lg-1">Shrink <i class="bi bi-link-45deg "></i></button>
    </form>
    <div className='table-responsive'>

    <table class="table text-center url-table container">
            { isloading ?<div>
             
                <div  aria-hidden="true">
  <div >
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class=" placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
  </div>
</div>

            </div> :
        <thead>
            <tr>
                <th class="">FullUrl</th>
                <th>Shrinked Url</th>
                <th>Clicks</th>
                <th>Action</th>
            </tr>
            {
                useurls.map(shorturl=>{
                    return(
                
                    
                    <tr key={shorturl._id} class='tablerow '>
                    <td className='p-3' ><a  href={shorturl.full} target="_blank" rel='noreferrer' style={{textDecoration:"none"}}>
                            {shorturl.full} <i class='bx bx-link' ></i>
                        </a></td>
                    <td><a href={`https://url-shortner-zen.herokuapp.com/${shorturl.short}`} target="_blank" rel='noreferrer' style={{textDecoration:"none"}}>
                    https://url-shortner-zen.herokuapp.com/{shorturl.short} <i class="bi bi-link-45deg"></i>
                        </a></td>
                    <td >
                        {shorturl.clicks}
                    </td >
                        <td>
                            <p name={shorturl._id} className="deleteicon" onClick={deletelink}>❌</p>
                        </td>
                </tr>
                    )
                })
            }
        </thead>
        }

    </table>
    </div>
    </div>
  )
}

export default Url_Shortner