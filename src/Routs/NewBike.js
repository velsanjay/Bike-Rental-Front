import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App';

function NewBike() {
    const navigate = useNavigate();
    const [model, setModel] = useState(null)
    const [year, setYear] = useState(null)
    const [manufacture, setManufacture] = useState(null)
    const [mileage, setMileage] = useState(null)
    const [img, setImg] = useState(null)
    const [seats, setSeats] = useState(null)
    const [bikeType, setBikeType] = useState(null)
    const [amount, setAmount] = useState(null);
    let {id} = useParams()

    const NewBike = async (e) => {
        e.preventDefault()
        try {
            let payload = {model, year, manufacture, mileage, img, seats, bikeType, amount}
            const res = await axios.post(`${url}/bike/new`,payload)
            console.log(res.data);
            let inp = document.querySelectorAll('input')
            for(let i of inp){
                i.value=''
            }
            let inp1 = document.querySelector('.MuiOutlinedInput-root')
            console.log(inp1);
            navigate(`/dashboard/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={(e)=>NewBike(e)}>
        <div className='new'>
            <h1>New Bike Detail</h1>
            <TextField
                onChange={(e)=>setModel(e.target.value)}
                id="filled-search"
                label="Model"
                helperText="Ex: R15"
                required
            />
            <TextField
                onChange={(e)=>setManufacture(e.target.value)}
                // InputProps={{ inputProps: { min: "2023-05-15" } }}
                label="Manufacture"
                helperText='Ex: Yamaha'
                required
            // defaultValue='2023-05-3'
            />
            <TextField
                onChange={(e)=>setYear(e.target.value)}
                id="filled-search"
                label="Year"
                type='number'
                helperText="Ex: 2021"
                required
            />
            <TextField
                onChange={(e)=>setMileage(e.target.value)}
                id="filled-search"
                label="Mileage"
                helperText='Ex: 40'
                required
            />
            <TextField
                onChange={(e)=>setImg(e.target.value)}
                id="filled-search"
                label="img Src Url"
                required
                helperText="https://imgk.timesnownews.com/story/R15_blue.png?tr=w-1200,h-900"
            />
            <TextField
                onChange={(e)=>setSeats(e.target.value)}
                id="filled-search"
                label="No of Seats"
                helperText="Ex: 2"
                required
            />
            <FormControl>
                <InputLabel id="demo-simple-select-label">Bike Type</InputLabel>
                <Select
                onChange={(e)=>setBikeType(e.target.value)}
                labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Bike Type"
                    required
                >
                    <MenuItem value={'standard'}>Standared</MenuItem>
                    <MenuItem value={'sport'}>Sports</MenuItem>
                    <MenuItem value={'tour'}>Touring</MenuItem>
                </Select>
            </FormControl>
            <TextField
                onChange={(e)=>setAmount(e.target.value)}
                id="filled-search"
                label="Amount"
                type="number"
                required
                helperText="Ex: 300/day"
            />
            <div className='but'>
                <Button
                    onClick={() => navigate(`/dashboard/${id}`)}
                >
                    Back
                </Button>
                <Button
                    type='submit'
                    variant="contained"
                    color="success">
                    Add New Bike
                </Button>
            </div>


        </div>
        </form>
    )
}

export default NewBike