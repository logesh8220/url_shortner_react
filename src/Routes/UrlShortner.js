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
        onSubmit: async (value,{resetForm}) =>{
            try {
              await axios.post(`${env.api}/urlshortner`,value)
               LoadData()
               resetForm({values:""})
            } catch (error) {
                console.log(error)
            }
            
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
        className:"tost-className"
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
    <div className='text'> <nav className="text-center url-nav text-light p-2 navbar">
    <div className="container">
        <h1>URL Shortner <i className="bi bi-link-45deg"></i></h1>
        <h5><i className="bi bi-person-circle me-2"></i>{params.name}</h5>
        <Link className='text-light a-text ' onClick={Logout} to={'/'}> Logout <i className="bi bi-box-arrow-left"></i></Link>
    </div>

</nav>
<form onSubmit={formik.handleSubmit}className="container text-center mb-5">
    <lable  className="sr-only"></lable>
    <input className="col-8 FullUrl" type="text" name='full' id='FullUrl' onChange={formik.handleChange} value={formik.values.full}  placeholder="URL" required/>
    <button type="submit" className=" url-btn col-lg-1">Shrink <i className="bi bi-link-45deg "></i></button>
    </form>
    <div className='table-responsive'>

    <table className="table text-center url-table container">
            { isloading ?<div>
             
                <div  aria-hidden="true">
  <div >
    <h5 className="card-title placeholder-glow">
      <span className="placeholder col-6"></span>
    </h5>
    <p className=" placeholder-glow">
      <span className="placeholder col-7"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-4"></span>
      <span className="placeholder col-6"></span>
      <span className="placeholder col-8"></span>
    </p>
  </div>
</div>

            </div> :
        <thead>
            <tr>
                <th className="">FullUrl</th>
                <th>Shrinked Url</th>
                <th>Clicks</th>
                <th>Action</th>
            </tr>
            {
                useurls.map(shorturl=>{
                    return(
                
                    
                    <tr key={shorturl._id} className='tablerow '>
                    <td className='p-3' ><a  href={shorturl.full} target="_blank" rel='noreferrer' style={{textDecoration:"none"}}>
                            {shorturl.full} <i className="bi bi-link-45deg"></i>
                        </a></td>
                    <td><a href={`https://url-shortner-zen.herokuapp.com/${shorturl.short}`} target="_blank" rel='noreferrer' style={{textDecoration:"none"}}>
                    https://url-shortner-zen.herokuapp.com/{shorturl.short} <i className="bi bi-link-45deg"></i>
                        </a></td>
                    <td >
                        {shorturl.clicks}
                    </td >
                        <td>
                            <Link name={shorturl._id} style={{textDecoration:"none"}} onClick={deletelink}>❌</Link>
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