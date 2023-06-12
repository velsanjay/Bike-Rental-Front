import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../App'
import { HashLoader} from 'react-spinners'
import { toast } from 'react-toastify'


function Dashboard() {
  let navigate = useNavigate()
  let token = sessionStorage.getItem('token')
  let [loading, setLoading] = useState(false)

  let logout = ()=>{
    sessionStorage.clear()
    navigate('/')
}

useEffect(()=>{
  const TokenVerify = async() =>{
    setLoading(true)
   try {
    let res= await axios.get(`${url}/token/validate`,{
      headers:{Authorization:`Bearier ${token}`}
  })
   } catch (error) {
    if(error.response.status === 401 || error.response.status===400)
      {
        toast.error(error.response.data.message)
        logout()
      }
   }
   setLoading(false)
  }
  TokenVerify()
},[])

  return (
    <div>
      {loading ?(
         <div className='load'>
         <HashLoader
         color={'darkblue'}
         loading={loading}
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
         </div>
      ):(
        <div>
        <NavBar />
      <HomePage/>
      </div>
      )}
      
    </div>
  )
}

export default Dashboard