import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App'
import axios from 'axios'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function ConfirmBooking() {
    const {id}= useParams()
    const {userid} = useParams()
    const [data, setData] = useState(null)
    const [bike , setBike] = useState(null)
    const [loading , setLoading] = useState(false)
    const [show , setShow] = useState(true)
    let navigate = useNavigate()
    let date;
    let date1;
    let days;
    let total;

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                setLoading(true)
                let res = await axios.get(`${url}/get/${userid}`)
                setData(res.data.data)
                if(res){
                    let resData = await axios.get(`${url}/get/${res.data.data.bikeId}`)
                    setBike(resData.data.data)
                }    
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    if(data !=null && bike!=null){
        let mon = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let mon1 = ['', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let ex1 = data.startDate.split('-')
        let ex2 = data.startTime.split(':')
        let ex3 = data.endDate.split('-')
        let ex4 = data.endTime.split(':')

        if(ex3[1]>ex1[1]){
                days = (ex3[2] - ex1[2])+1+mon1[Number(ex1[1])]
                total = bike.amount * days + data.plan
            }else{
            days = ex3[2]-ex1[2]+1
            total = bike.amount * days + data.plan
        }
        if(ex2[0]>12){
            let start = (ex2[0]-12).toString()
            if(start.length==1){
                date = `0${start}:${ex2[1]} pm ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
            }else{
                date = `0${start}:${ex2[1]} pm ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
            }
           
        }else{
            date = `${data.startTime} am ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
        }
      
        if(ex4[0]>12){
            let start = (ex4[0]-12).toString() 
            if(start.length==1){
                date = `0${start}:${ex2[1]} pm ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
            }else{
                date = `0${start}:${ex2[1]} pm ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
            }
        }else{
            date1 = `${data.endTime} am ${mon[Number(ex3[1])]} ${ex3[2]} ${ex3[0]}`
        }
    }
    const LoaderPage = () =>{
        setLoading(true)
        setTimeout(()=>{
            toast.success("Payment Send Successfully!!!")
            setLoading(false)
            setShow(false)
        },7000)
    }

    const ConfirmBook = async() =>{
        setLoading(true)
        try {
            let payload = {id, book:userid}
            let payload1= {_id:bike._id, available:false}
            let res = await axios.patch(`${url}/edit`, payload)
            console.log(res.data)
            toast.success(res.data.message)
            let res1 = await axios.patch(`${url}/bike/edit`, payload1)
            console.log(res1.data)
            navigate(`/dashboard/${id}`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        setLoading(false)
    }
    const CancelBook = async ()=>{
        try {
            let payload = {id:data._id}
            let res = await axios.post(`${url}/book/remove`, payload)
            console.log(res.data)
            navigate(`/dashboard/${id}`)        
        } catch (error) {
            console.log(error)
        }
    }


  return <>
 {loading ?(
  <div className='load'>
          <RingLoader
          color={'darkblue'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
          </div>
          ):(
    <div>
        {data != null && bike !=null ?(
          <div className='confirm'>
            <img className='img' src={bike.img}/>
            <div className='bord'>
                <h1>Driver Detail</h1>
                <hr/>
                <p>Name : {data.firstName} {data.lastName}</p>
                <p>Email : {data.email}</p>
                <p>Phone : {data.phoneNo}</p>
            </div>
            <div className='bord'>
                <h1>Summary</h1>
                <hr/>
                <h3>{bike.year} {bike.model}</h3>
                <p>Rate : ₹{bike.amount}/Day</p>
                <p>Total Days : {days} Days</p>
                <p>Pickup : {date}</p>
                <p>Return : {date1}</p>
                <hr/>
                <h3>Insurance</h3>
                {data.plan==100 ?(
                    <div>
                        <h4>Basic</h4>
                        <p>₹{data.plan}.00</p>
                    </div>
                ): data.plan==200 ?(
                    <div>
                    <h4>Premium</h4>
                    <p>₹{data.plan}.00</p>
                </div>
                ):(
                    <div>
                    <h4>None</h4>
                    <p>₹{data.plan}</p>
                </div>
                ) }
                <hr/>
                <div>
                <div>
                <p>Total</p>
                <p>₹{total}.00</p>
            </div>
            {show ? (
                 <Button variant='contained' 
                 onClick={()=>LoaderPage()}
                //  onClick={()=>console.log(total)}
                 color='success'>Pay Now</Button>
            ):(
                <Button variant='contained' 
                color='success'
                disabled
                >Paid</Button>
            )}
           
            </div>
            </div>
            <Button variant='contained' 
            onClick={()=>CancelBook()}
            color='error'>Cancel Booking</Button>
          {show ?(
          <Button disabled variant='contained'>Confirm And Book</Button>   
          ):(
            <Button 
            onClick={()=>ConfirmBook()}
            variant='contained'>Confirm And Book</Button>
            )}
          </div>
        ):(
            <p>No Data Found!!!</p>
        )}
        
    </div>
          )}
    </>
}

export default ConfirmBooking