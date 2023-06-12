import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { url } from '../../App'
import { useNavigate } from 'react-router-dom'
import { EmailSendValue } from '../data'
import { toast } from 'react-toastify'

function ForgetEmail() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPsssword] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    let navigate =useNavigate()

    const FormSubmit = async(e) =>{
        e.preventDefault()
        try {
            let payload={email, password, confirmPassword}
            let res = await axios.patch(`${url}/forget`,payload)
            toast.success(res.data.message1)
            toast.success(res.data.message2)
            console.log(res.data)
            EmailSendValue(res.data.data)
            navigate('/validate')
        
        } catch (error) {
            toast.error(error.response.data.message)
        }
        
    } 

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <form className='new' onSubmit={(e)=>FormSubmit(e)}>
                <h1>Forget Password</h1>
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


                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        required
                        onChange={(e) => setConfirmPsssword(e.target.value)}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        label="confirm"
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
                        <p onClick={()=>navigate('/')}>Already You Have Account ?</p>
                        <Button
                        type='submit'
                        variant='contained'>Forget</Button>
                </div>

                <div className='but'>
                        <p onClick={()=>navigate('/signup')}>Create New Account?</p>
                        <p onClick={()=>navigate('/validate')}>Verify Your Email?</p>
                </div>

            </form>
        </div>
    )
}

export default ForgetEmail