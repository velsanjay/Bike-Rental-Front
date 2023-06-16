import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailSendValue } from '../data'
import axios from 'axios'
import { url } from '../../App'
import { ScaleLoader } from 'react-spinners'
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { toast } from 'react-toastify'

function ResendEmail() {
    const[email, setEmail]= useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
    const ResendOTP = async (e)=>{
      e.preventDefault()
      setLoading(true)
      try {
        const payload={email}
        const res= await axios.post(`${url}/user`,payload) 
       await EmailSendValue(res.data.data)
        navigate('/validate')
   
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
    setLoading(false)
  }
    return <>
{loading ?(
     <div className='load'>
     <ScaleLoader
     color={'darkblue'}
     loading={loading}
     size={150}
     aria-label="Loading Spinner"
     data-testid="loader"
   />
     </div>
  ):(
  
    <div>
      <form className='new' onSubmit={(e)=>ResendOTP(e)}>
        <h1>Resend OTP</h1>
                <FormControl variant="standard">
            <InputLabel
              htmlFor="input-with-icon-adornment">
              email
            </InputLabel>
            <Input
              required
              onChange={(e) => setEmail(e.target.value)}
              id="input-with-icon-adornment"
              label="email"
              type='email'
              className='email'
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          
          <div className='but'>
            <p onClick={()=>navigate('/')}>Already You Have Account ?</p>
          <Button
          variant='contained'
          type='submit'
          >Validate</Button>
          </div>
</form>
    </div>
    )}
    </>
}

export default ResendEmail