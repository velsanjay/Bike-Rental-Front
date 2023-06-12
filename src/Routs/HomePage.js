import React, { useState } from 'react'
import { Data } from './data'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../App'
import { AppState } from '../contaxt/AppProvider'
import { HashLoader } from 'react-spinners'

function HomePage() {
  const navigate = useNavigate()
  const {state,dispatch} = AppState()
  let {id} = useParams()
  const [loading, setLoading] = useState(false)

  const fetchData = async(id) =>{
    let fetch=[];
    setLoading(true)
    try {
        let res = await axios.get(url)
        for(let i of res.data.data){
            if(i.bikeType===id){
                fetch.push(i)
            }
        }
        if(fetch.length !==0 ){
          dispatch({type:"get-data",payload:fetch})
        }else{
          console.log('No Data Found!!!')
        }
        // console.log(data)
    } catch (error) {
     console.log(error.responce.data)   
    }
    setLoading(false)
}
const RetunData = async() =>{
  setLoading(true)
  try {
      dispatch({type:"get-data", payload:Data})    
  } catch (error) {
      console.log(error)
  }

  setLoading(false)
}

  return (
    <div>
      {loading ?(
        <div className='load'>
        <HashLoader
        color={'darkblue'}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
      ):(

      
    <div>

      {state.data.length !==0 ?(
      <div style={{"marginTop":"90px"}}>
      { state.data[0]._id  ?(
          <h1>Select Vehicle</h1>
        ):(
          <h1>Select Catogrie</h1>
        )}
      </div>
        ):(
          <p style={{"display":"none"}}></p>
        )}
    <div className='home'>
      
      {state.data.length!==0 ?(
        state.data.map((data,index)=>(
          <div
          className='home1'
          key={index}>
            
            <h2>{data.year} {data.model}</h2>
            <img alt={data.model} src={data.img}/>
            {data._id?(
              <div className='data'>
                 <Button
            style={{"position":"inherit"}}
            onClick={()=>RetunData()}>Go Back</Button>
          
            <Button
            style={{"position":"inherit"}}
            onClick={()=>navigate(`/${id}/${data._id}`)}
            variant="contained" color="secondary">Book</Button>
            </div>
            ):(
            <Button
            style={{"position":"inherit"}}
            onClick={()=>fetchData(data.val)}
            variant="contained" color="primary">Select</Button>
        )}
           
          </div>
        ))
      ):(
        <p>No Data Found</p>
      )}
    </div>
    </div>
 )}
    </div>
  )
}

export default HomePage