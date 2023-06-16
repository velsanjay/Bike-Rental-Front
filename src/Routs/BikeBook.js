import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../App'

function BikeBook() {
    const {userid} = useParams()
    const {id} = useParams()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [email, setEmail] = useState(null)
    const [phoneNo, setPhoneNo] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [plan, setPlan] = useState(null)
  let curDate;

    let Full=new Date()
    let fullMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31]
    let year=Full.getFullYear()
    let month=(Full.getMonth()+1).toString()
    let date=Full.getDate().toString()
    let date1 = (Full.getDate() + 28 - fullMonth[month]).toString()
    if (month.length===1){
      month=`0${month}`
    }
    if(date.length===1){
      date=`0${date}`
    }
    if(date1.length===1){
      date=`0${date}`
    }
    curDate=`${year}-${month}-${date}`

    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        let payload ={firstName, bikeId:userid, plan, lastName, startDate, startTime, endDate, endTime, email, phoneNo}
        let res = await axios.post(`${url}/book`,payload)
        navigate(`/${id}/booking/${res.data.data._id}`)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
      <h1 style={{"color":"#fff"}}>Information</h1>
       <form className='form' onSubmit={handleSubmit}>
        
        <TextField id="filled-basic" label="First Name" 
        onChange={(e)=>setFirstName(e.target.value)}
        required
        variant="filled" />

        <TextField id="filled-basic" label="Last Name" 
        onChange={(e)=>setLastName(e.target.value)}
        required
        variant="filled" />

        <TextField id="filled-basic" fullWidth label="Email" 
        onChange={(e)=>setEmail(e.target.value)}
        required
        type='email'
        variant="filled" />

        <TextField id="filled-basic" fullWidth label="Phone No" 
        onChange={(e)=>setPhoneNo(e.target.value)}
        required
        type='number'
        variant="filled" />

        <TextField id="filled-basic" type='Date' label="Start Date" 
        InputProps={{ inputProps: { min: `${curDate}` } }}
        onChange={(e)=>setStartDate(e.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled" />

        <TextField id="filled-basic" type='time' label="Starting Time" 
        onChange={(e)=>setStartTime(e.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled" />

        <TextField id="filled-basic" type='Date' label="End Data" 
        onChange={(e)=>setEndDate(e.target.value)}
        InputProps={{ inputProps: { min: `${startDate || curDate}`  } }}
        required
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled" />

        <TextField id="filled-basic" type='time' label="Ending Time" 
        onChange={(e)=>setEndTime(e.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled" />

<FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Insurance Plan</FormLabel>
      <RadioGroup
        row
        defaultValue='0'
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e)=>setPlan(e.target.value)}
      >
        <FormControlLabel value="0" control={<Radio />} label="None ₹0" />
        <FormControlLabel value="100" control={<Radio />} label="Basic ₹100" />
        <FormControlLabel value="200" control={<Radio />} label="Premium ₹200" />
        
      </RadioGroup>
    </FormControl>

        <div className='cardtop'>
        <Button onClick={()=>navigate(`/${id}/${userid}`)}>Go Back</Button>
        <Button type='submit' variant='contained' color='success'>Continue Booking</Button>
        </div>
       </form>
    </div>
  )
}

export default BikeBook