import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { setuserid } from "./reportslice";

function SignUp() {

var [reports,setreports]=useState([])
  const navigate = useNavigate();
const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setError("All fields are required ❌");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match ❌");
    return;
  }

  setError("");

  // ✅ Create new user
  const newUser = {
    
    username: form.name,
    email: form.email,
    password: form.password,
    report: []   
  };

  
 const response= await fetch("http://localhost:4000/reports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })

const data=await response.json()
const userid=data.id
localStorage.setItem("userid",userid)
dispatch(setuserid({userid}))


alert("Welcome")

    
    navigate("/userhome");
  
}



  
  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f5f5"
    }}>

      <Paper className="pap" elevation={5} style={{
        padding: "30px",
        width: "100%",
        maxWidth: "450px",
        borderRadius: "15px"
      }}>

        <Typography variant="h5" align="center" gutterBottom>
          Sign <span style={{ color: "#1976d2" }}>Up</span>
        </Typography>

        <form autoComplete="off" onSubmit={handleSubmit} >

          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            autoComplete="new-email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            error={
              form.confirmPassword &&
              form.password !== form.confirmPassword
            }
            helperText={
              form.confirmPassword &&
              form.password !== form.confirmPassword
                ? "Passwords do not match"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Typography color="error" align="center" style={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
           
          >
            Sign Up
          </Button>

        </form>

        <Typography align="center" style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login" style={{color:"blue"}}>Log In</Link>
        </Typography>
          
          <Typography align="center" style={{ marginTop: "0px" }}><h3 id="or">or  </h3>
          <Link to="/adminlogin" style={{color:"blue"}}>Admin</Link>
        </Typography>
      </Paper>

    </div>
  );
}

export default SignUp;
