import { AccountCircle } from '@mui/icons-material'
import { Button, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import { url } from '../../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ScaleLoader } from 'react-spinners'

function ValidateEmail() {
  const[email, setEmail]= useState(null)
  const [value,setValue]= useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const Validate = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const payload={email,value}
      console.log(payload)
      const res= await axios.patch(`${url}/validate`,payload)
      toast.success(res.data.message)      
      navigate('/')
 
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
      <form className='new' onSubmit={(e)=>Validate(e)}>
        <h1>Validate User</h1>
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
          <TextField
          onChange={(e)=>setValue(e.target.value)}
          variant='standard' 
          label='Enter Your OTP'
          />
          <div className='but'>
          <p onClick={()=>navigate('/resend')}>Resend OTP ?</p>
            
          <Button
          variant='contained'
          type='submit'
          >Validate</Button>
          </div>
          <div className='but'>
          <p onClick={()=>navigate('/')}>Already You Have Account ?</p>
            <p onClick={()=>navigate('/forget')}>Forget Password ?</p>
          </div>
</form>
    </div>
    )}
    </>

}

export default ValidateEmail