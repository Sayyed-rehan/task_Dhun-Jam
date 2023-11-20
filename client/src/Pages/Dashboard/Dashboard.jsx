import React, { useState } from "react";
import axios from "axios";
import {Button, TextField, RadioGroup, Radio, FormControl, FormControlLabel, Grid, Box, Typography, Stack} from "@mui/material";
import "./Dashboard.css";
import { useEffect } from "react";
import {Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis}from 'recharts'



const Dashboard = () => {

    const [userData, setuserData] = useState([])
    const [updateValues, setupdateValues] = useState()
    const [isUpdate, setisUpdate] = useState(false)
    const [checkYesOrNo, setcheckYesOrNo] = useState("Yes")

    const Stylinging = {
        padding:"2px",
        width:"60px",
        "& label.Mui-focused": { color: "white" },
        "& .MuiInput-underline:after": { borderBottomColor: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
            borderRadius:"10px"
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& input": {
            color: "white",
          },
        }
    }
    




  let id = JSON.parse(localStorage.getItem("user_id"));

  const fetchData = async () => {
    const responce = await axios.get(`https://stg.dhunjam.in/account/admin/${id?.id}`);
    setuserData(responce.data.data)
    setupdateValues(responce.data.data.amount)
    if(responce.data.data.charge_customers==false){
        setcheckYesOrNo("No")
    }
    };

    console.log('ass',checkYesOrNo);
    const datas = Object.keys(userData && userData.id==4?userData?.amount:0).map((key) => {
        return { name: key, amount: userData.amount[key] };
      });
      
      const handleUpdateValues = (e)=>{
        //   setupdateValues(e.target.value)
        setupdateValues({...updateValues, [e.target.name]:e.target.value})
        }
        
        console.log('upvaleu',updateValues);



    const handleSave = async()=>{
        const responce = await axios.put("https://stg.dhunjam.in/account/admin/4",{
            amount:updateValues
        })
        console.log(responce.data.data);
        setisUpdate(!isUpdate)
    }

    


  useEffect(()=>{
    fetchData()
   
  },[isUpdate])

  return (
    <div>
      <Box className="dashboard-container">
        <Box className="dashboard-header">
        <Typography fontWeight="bold" fontSize="32px">
            {userData.name}, {userData.location} on Dhun Jam
        </Typography>
        </Box>
        <Box className="dashboard-grid">
        <Grid container className="grid">
            <Grid item xs={6} bgcolor="" className="grid1" >
            <Stack spacing={3}>
                <Typography fontSize="16px" >Do you want to charge your customers for requesting songs</Typography>
                <Typography fontSize="16px">Customer song request amount</Typography>
                <Typography fontSize="16px">Regular song request amounts, from high to low</Typography>
            </Stack>
            </Grid>

            <Grid item xs={6} bgcolor='' sx={{display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center"}} >
            <Stack spacing={3}>

            
            <Box className="grid-2-1">
            {userData && userData.id==4?
            <FormControl>
                <RadioGroup row defaultValue={ userData.charge_customers==true?"yes":"no"} >
                    <FormControlLabel value="yes" control={<Radio sx={{color: "white",'&.Mui-checked': {color: "#6741D9",},
        }}/>} label="Yes" onClick={()=>setcheckYesOrNo("Yes")}/>
                    <FormControlLabel value="no" control={<Radio sx={{color: "white",'&.Mui-checked': {color: "#6741D9",}}}/>} label="No" onClick={()=>setcheckYesOrNo("No")}/>
                </RadioGroup>
                </FormControl>
            :null}
            </Box>
            <Box className='grid-2-2'>
                <TextField  value={updateValues?.category_6} name="category_6" fullWidth size="small" disabled={checkYesOrNo=="No"} onChange={handleUpdateValues} 
                sx={{"& label.Mui-focused": { color: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius:"10px"
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& input": {
                  color: (checkYesOrNo=="Yes" ?"white":"C2C2C2")
                },
              }
                }}/>
            </Box>

            <Box>
            {userData && userData.id==4?
            Object.keys(updateValues).map((x,i)=>{
                if(i>0){
                return (<><TextField disabled={checkYesOrNo=="No"} value={updateValues[x]} name={x} onChange={handleUpdateValues} size="small" sx={Stylinging}/></>)
                }
            })
            :<h1>Loading</h1>}
            </Box>
            </Stack>
            </Grid>
        </Grid>
        </Box>

        <Box className="chart-container">
        {checkYesOrNo=="Yes"?
            <BarChart width={600} height={275} data={datas}     barSize={30}>
            <XAxis dataKey='name' />
            <YAxis>
                <Label value="₹" offset={0} position="insideTopLeft" />
            </YAxis>
            <Tooltip />
            <Bar dataKey='amount' fill="#F0C3F1"/>
            </BarChart>
        :null}
        </Box>
        <Box className="save-button">
        <Button fullWidth  sx={{  color: '#fff', backgroundColor: '#6741D9', borderColor: '#6741D9', borderRadius:"10px",fontWeight:"bold",
            '&:hover': { backgroundColor: '#6741D9', borderColor: '#F0C3F1', borderWidth: '1px', borderStyle: 'solid',},
            '&:active': { backgroundColor: '#6741D9', borderColor: '#F0C3F1', borderWidth: '1px', borderStyle: 'solid',},}} onClick={handleSave}
            disabled={checkYesOrNo=="No" || updateValues?.category_6<100 || updateValues?.category_7<80 ||updateValues?.category_8<60 
            ||updateValues?.category_9<40 ||updateValues?.category_10<20} >
            Save
        </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
