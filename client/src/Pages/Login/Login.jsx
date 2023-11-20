import React, { useState } from "react";
import "./Login.css";
import { Box, TextField, Typography, Stack, Button, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios, { AxiosError, HttpStatusCode } from "axios"
import {useNavigate} from "react-router-dom"



const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const nav = useNavigate()

  
  const handleInput = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    const [showPassword, setshowPassword] = useState(false)
    const handleClickShowPassword = () => setshowPassword((show) => !show);
    const handleMouseDownPassword = () => setshowPassword(!showPassword);

    const handleClick = async()=>{
        const responce = await axios.post("https://stg.dhunjam.in/account/admin/login",{
            username:user.username,
            password:user.password
        })
        console.log(responce.data.data.id);

        if(responce.status==200){
            alert("login")
            // setUser({username:"", password:""})
            localStorage.setItem("user_id", JSON.stringify(responce.data.data))
            nav("/dashboard")

        }else if(AxiosError){
            alert("onvalid")
        }
      

    }



  return (
    <div>
      <Box className="login-container">
        <Box className="header">
          <Typography fontSize="32px" fontWeight="bold" fontStyle="Poppins">
            Venue Admin Login
          </Typography>
        </Box>
        <Box className="login-field">
        <Stack spacing={2}>
          <TextField
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleInput}
            sx={{
              "& label.Mui-focused": { color: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius:"17px"
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
              },
            }}
          />

          <TextField
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInput}
            type={showPassword?"text":"password"}
            InputProps={{ 
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <VisibilityIcon sx={{color:"white"}}/> : <VisibilityOffIcon sx={{color:"white"}}/>}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
            sx={{
              "& label.Mui-focused": { color: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius:"17px"
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
              },
            }}
          />
          </Stack>
        </Box>
        <Box className="sign-button">
        <Button onClick={handleClick} sx={{ color: '#fff', backgroundColor: '#6741D9', borderColor: '#6741D9', borderRadius:"10px",fontWeight:"bold",
            '&:hover': { backgroundColor: '#6741D9', borderColor: '#F0C3F1', borderWidth: '1px', borderStyle: 'solid',},
            '&:active': { backgroundColor: '#6741D9', borderColor: '#F0C3F1', borderWidth: '1px', borderStyle: 'solid',},}}>
            Sign-in
        </Button>
        </Box>
        <Typography sx={{mt:"-15px"}}>New Regestration ?</Typography>
      </Box>
    </div>
  );
};

export default Login;
