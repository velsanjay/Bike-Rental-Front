import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App'

function LogOut() {
  const {id} = useParams()
  const navigate = useNavigate()

  let Logout = ()=>{
    sessionStorage.clear()
    navigate('/')
}

  const RemoveUser = async() =>{
    try {
      let payload = {id}
      let res = await axios.post(`${url}/user/remove`,payload)
      console.log(res.data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='load1'>
      <Button variant='contained'
      onClick={()=>navigate(`/dashboard/${id}`)}
      >Go Back</Button>
      <Button variant='contained' color='error'
      onClick={()=>Logout()}
      >LogOut</Button>
      <Button variant='contained' 
      onClick={()=>RemoveUser()}
      color='error'>Remove User</Button>
    </div>
  )
}

export default LogOut