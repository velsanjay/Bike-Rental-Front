import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { url } from '../../App';
import { EmailSendValue } from '../data';
import { toast } from 'react-toastify';



function SignUp() {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);
  const [licenceNo, setLicenceNo] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmPassword, setConfirmPsssword] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null)
  let curDate;

  const handleUser = async (e) => {
    e.preventDefault();

    let payload = { name, email, password, confirmPassword, phoneNo, role, licenceNo, expDate }
    try {
      let res = await axios.post(`${url}/signup`, payload)
        toast.success(res.data.message)
      console.log(res.data)
      EmailSendValue(res.data.data)
      let data = document.querySelectorAll('input')
      for (let i of data) {
        i.value = '';
      }
      navigator('/')
    } catch (error) {
        toast.error(error.response.data.message)
      console.log(error)
    }

  }


    let Full=new Date()
    let year=Full.getFullYear()
    let month=(Full.getMonth()+1).toString()
    let date=Full.getDate().toString()
    if (month.length===1){
      month=`0${month}`
    }
    if(date.length===1){
      date=`0${date}`
    }
    curDate=`${year}-${month}-${date}`
    // value.push(month)


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='sigin'>
      <h1> Sign Up </h1>
      <form onSubmit={handleUser}>
        <div className='items'>
          {/* <div className='but'> */}


          <TextField
            id="outlined-basic"
            onChange={(e) => setName(e.target.value)}
            required label="Name" variant="standard" />

          <FormControl variant="standard" >
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
            </Select>
          </FormControl>

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
          <TextField
            id="outlined-basic"
            onChange={(e) => setPhoneNo(e.target.value)}
            required label="Phone No" type='number' variant="standard" />

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
            <TextField
              id="outlined-basic"
              onChange={(e) => setLicenceNo(e.target.value)}
              required label="Licence No" variant="standard" />

            <TextField
              id="outlined-basic"
              type="date"
              InputProps={{ inputProps: { min: `${curDate}` } }}
              onChange={(e) => setExpDate(e.target.value)}
              defaultValue={curDate}
              required label="Exp Date" variant="standard" />
          

        </div>

        <div className='flex'>
          <p onClick={() => navigator('/forget')}>Forget Password?</p>
          <Button
            variant="contained"
            type='submit'
            color="secondary">
            Sign Up
          </Button>

        </div>
        <div className='but'>
        <p onClick={() => navigator('/')} > Already You Have Account?</p>
        <p onClick={() => navigator('/validate')} > Validate Email ?</p>
        </div>
      </form>
    </div>
  )
} 

export default SignUp