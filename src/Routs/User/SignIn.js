import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { url } from '../../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SignIn() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const FetchData= async(e) => {
        
        e.preventDefault();

        try {
            let payload={email, password}
            let res=await axios.post(`${url}/signin`,payload)
            console.log(res.data)
            toast.success(res.data.message)
             sessionStorage.setItem('token',res.data.token)
            navigate(`/dashboard/${res.data.data._id}`)
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }

    return (
    <div>
        <form className='new'  onSubmit={FetchData}>
            <h1>Sign In</h1>
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
              className='email'
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />

          </FormControl>

          <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password"> Password</InputLabel>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        label="First Name"
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            <div className='but'>
                <p onClick={()=>navigate('/validate')}>Verify Email?</p>
                <Button variant='contained'
                type='submit'
                >Sign In</Button>
            </div>
            <div className='but'>
                <p onClick={()=>navigate('/signup')}>Create New Account ?</p>
                <p onClick={()=>navigate('/forget')}>Forget Password ?</p>
            </div>
        </form>
    </div>
  )
}

export default SignIn