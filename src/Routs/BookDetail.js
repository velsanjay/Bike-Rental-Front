import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function BookDetail() {
    let {id} = useParams()
    const [bike, setBike] = useState(null)
    const [data, setData] = useState(null)
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let date;
    let date1;
    let days;
    let total;

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                setLoading(true)
                let res = await axios.get(`${url}/get/${id}`)
                if(res && res.data.data.book !=null){
                    let resData = await axios.get(`${url}/get/${res.data.data.book}`)
                    setData(resData.data.data)

                    if(resData){
                        let res1 = await axios.get(`${url}/get/${resData.data.data.bikeId}`)
                        setBike(res1.data.data)
                    }
                }  
                console.log(bike, data)  
                
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
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
            let start = ex2[0]-12 
            date = `0${start}:${ex2[1]} pm ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
        }else{
            date = `${data.startTime} am ${mon[Number(ex1[1])]} ${ex1[2]} ${ex1[0]}`
        }
      
        if(ex4[0]>12){
            let start = ex4[0]-12 
            date1 = `0${start}:${ex4[1]} pm ${mon[Number(ex3[1])]} ${ex3[2]} ${ex3[0]}`
        }else{
            date1 = `${data.endTime} am ${mon[Number(ex3[1])]} ${ex3[2]} ${ex3[0]}`
        }
    }
    
    const ReturnBike = async() =>{
       setLoading(true)
        try {
        let payload = {id:data._id}
        let payload1 = {id, book:null}
        let payload2 = {_id:bike._id, available:true}
        let res = await axios.post(`${url}/book/remove`, payload)
        let res1 = await axios.patch(`${url}/edit`, payload1)
        let res2 = await axios.patch(`${url}/bike/edit`, payload2)
        toast.success(res1.data.message)
        navigate(`/dashboard/${id}`)
       } catch (error) {
            console.log(error)        
       }
       setLoading(false)
    }
  return (
    <div>
        {loading ? (
            <div className='load'>
            <GridLoader
            color={'darkblue'}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
            </div>
    
        ):(
            <div>
            {data != null && bike !=null ?(
              <div className='confirm'>
                <h1>My Bookings</h1>
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
                            <p>Basic</p>
                            <p>₹{data.plan}.00</p>
                        </div>
                    ): data.plan==200 ?(
                        <div>
                        <p>Premium</p>
                        <p>₹{data.plan}.00</p>
                    </div>
                    ):(
                        <div>   
                        <p>None</p>
                        <p>₹{data.plan}</p>
                    </div>
                    ) }
                    <div>
                        <hr/>
                    <div>
                    <p>Total</p>
                    <h3 style={{"textAlign":"start"}}>₹{total}.00</h3>
                </div>
                
               
                </div>
                </div>
              <Button variant='contained' 
              onClick={()=>ReturnBike()}
              color='error'>Return Bike</Button>
              </div>
            ):(
                <div className='load'>
                <Button
                variant='contained'
                color='error'
                onClick={()=>navigate(`/dashboard/${id}`)}
                >No Booking Found</Button>
                </div>
            )}
            
        </div>
        )}
    </div>
  )
}

export default BookDetail