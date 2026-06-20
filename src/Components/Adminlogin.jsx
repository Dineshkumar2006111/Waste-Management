import React, { useState } from "react";
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

function Adminlogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    adminid: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.adminid || !form.password) {
    
    
    alert("Please fill all fields ❌");
    return;
  }

  // ✅ Fetch users
  fetch("http://localhost:4000/admin")
    .then((res) => res.json())
    .then((data) => {

      if(form.adminid==data.adminid && form.password==data.password){
        navigate("/adminhome");
      } else {
        alert("Invalid Id or Password ❌");
      
      }
    });
};

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f5f5"
    }}>

      <Paper elevation={5} style={{
        padding: "30px",
        width: "100%",
        maxWidth: "500px",   // 👈 increased width
        borderRadius: "15px"
      }}>

        <Typography variant="h5" align="center" gutterBottom style={{fontFamily:"ui-monospace"}}>
          Admin
        </Typography>

        <form autoComplete="off" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Admin ID"
            type="AdminId"
            name="adminid"
            margin="normal"
            value={form.adminid}
            autoComplete="new-id"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            value={form.password}
            autoComplete="new-password"
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
          >
           Admin Login
          </Button>

        </form>


        <Typography align="center" style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/" style={{color:"blue"}}>Sign Up</Link>
        </Typography>

      </Paper>

    </div>
  );
}

export default Adminlogin;