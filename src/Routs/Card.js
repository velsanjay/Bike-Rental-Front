// import { Button } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavBar from './NavBar';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { cardData } from './data';
import { DotLoader } from 'react-spinners'

function Card() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [value , setValue] = useState(0)
    const {id} = useParams();
    const {userid} = useParams()
    const [data , setData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        const fetchData = async() =>{
            setLoading(true)
            try {
                let res = await axios.get(url)
                let fetchData = res.data.data.find((e)=>e._id==userid)
                setData(fetchData)
                let res1 = await axios.get(`${url}/get/${id}`)
                setUser(res1.data.data)
            } catch (error) {
             console.log(error)   
            }
            setLoading(false)
        return data;
        }
        fetchData()
    },[])
  return <>
    {loading ?(
        <div className='load'>
        <DotLoader
        color={'darkblue'}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
    ):(
        <div>
        <NavBar/>
       {data !=null ? (
       <div className='card'>
        <div className='card1'>
            <KeyboardBackspaceIcon
            className='cur'
            onClick={()=>navigate(`/dashboard/${id}`)}
            />
            <h2>{data.model}</h2>
            <p></p>
            <img alt={data.model} src={data.img}/>
            <div className='cardtop'>
            {data.available===true ?(
                <div className='card1'>
                    <DoneIcon/>
                 <h3> Available</h3>
                 </div>
            ):(
                <div className='card1' style={{"opacity":"0.5"}} >
                    <CloseIcon/>
                <h3>Not Available</h3>
                </div>
            )}
            <div className='card1'>
            <CurrencyRupeeIcon/>
        <h4>{data.amount}/Day</h4>
        </div>
        </div>

        </div>

       <div className='card2'>
        <h2>Vehicle Specs</h2   >
        <hr/>
        <div className='card3'>
        <h4>year</h4>
        <h4>Manufacture</h4>
        <h4>Model</h4>
        <p>{data.year}</p>
        <p>{data.manufacture}</p>
        <p>{data.model}</p>
        <h4>Mileage</h4>
        <h4>Seats</h4>
        <h4>Type</h4>
        <p>{data.mileage}</p>
        <p>{data.seats}</p>
       </div>
        <p>{data.bikeType}</p>
       </div>
     <div className='card2 wid'>
        <h2>Insurance</h2>
        <hr/>
        <div>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}>
                    <div className='card4'>
                    {cardData ? (
                       cardData.map((data,index)=>(
                        <div key={index} className='ind'>
                    <FormControlLabel value={data.value} control={<Radio/>} label={data.name}/>
                    <hr/>
                    <div className='cards1'>
                        {data.opa1==true ? (<>
                            <div className="cards" >
                                <DoneIcon
                                color="success"
                                />
                                <p>{data.point1}</p>
                            </div>
                            <div className="cards">
                            <DoneIcon
                                color="success"
                            />
                            <p>{data.point2}</p>
                        </div>
                        </>):(<>
                            <div
                             className="cards"
                            style={{"opacity":"0.5"}} 
                            >
                            <CloseIcon/>
                            <p>{data.point1}</p>
                        </div>
                        <div
                         className="cards"
                        style={{"opacity":"0.5"}}>
                            <CloseIcon/>
                            <p>{data.point2}</p>
                        </div>
                       </> )}
                       {data.opa2==true ? (<>
                            <div className="cards" >
                                <DoneIcon
                                color="success"
                                />
                                <p>{data.point3}</p>
                            </div>
                            <div className="cards">
                            <DoneIcon
                                color="success"
                            />
                            <p>{data.point4}</p>
                        </div>
                        </>):(<>
                            <div
                             className="cards"
                            style={{"opacity":"0.5"}} 
                            >
                            <CloseIcon/>
                            <p>{data.point3}</p>
                        </div>
                        <div
                         className="cards"
                        style={{"opacity":"0.5"}}>
                            <CloseIcon/>
                            <p>{data.point4}</p>
                        </div>
                       </> )}
                        </div>
                        </div>
                       )) 
                     ):(
                        <p>hello</p>
                    )}
                    <div>                
                </div>
                </div>
                </RadioGroup>
                <hr/>
                {user && user.book !=null ?(
                    <Button
                    variant="contained"
                    color="secondary"
                    disabled
                    >Plese Return Your Bike</Button>
                ):data.available==true ?(
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={()=>navigate(`/${id}/book/${data._id}`)}
                    >Book For This Bike</Button>
                ):(
                    <Button
                variant="contained"
                color="secondary"
                disabled
                // onClick={()=>navigate(`/${id}/book/${data._id}`)}
                >Bike Already Booked</Button>
                )}
                
       </div>                                                  
       </div>
       </div>
       ):(
        <p>No Data Found</p>
       )}
    </div>
    )}
   
   </>
}

export default Card
