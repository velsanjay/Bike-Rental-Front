import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../App';

function NavBar() {
    let navigate = useNavigate()
    let {id} = useParams()
    const [data, setData] = useState(null) 
  
    useEffect(()=>{
      const fetchData = async() =>{
        try {
          let res = await axios.get(`${url}/get/${id}`)
          setData(res.data.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    },[])

  return (
    <div >
      {data ?(
        <div className="nav">
        <h1 className='cur'>Bike Rent</h1>
        
        {data.role=="admin" ?(
          <Button 
          onClick={()=>navigate(`/${id}/new`)}
          color='inherit'>New Bike</Button>
        ):(
          <p></p>
        )}
        
        <TwoWheelerIcon 
         onClick={()=>navigate(`/${id}/bike`)}
        className='cur'/>        
        <Avatar
        className='cur'
        onClick={()=>navigate(`/${id}`)}
        src="/broken-image.jpg" />
    </div>
      ):(
        <p></p>
      )}
    
    </div>
  )
}

export default NavBar