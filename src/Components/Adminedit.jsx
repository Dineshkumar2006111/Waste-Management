import React , { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from "react-icons/io5";

const Adminedit = () => {

var uid=useSelector(state=>state.report.userid);
var rid=useSelector(state=>state.report.reportid);
var [dat,setdat]=useState("")
var [reports,setreports]=useState([])
const [frp,setfrp]=useState({})
const navigate=useNavigate()

  useEffect(()=>{
    fetch('https://waste-management-db-json.onrender.com/reports',{method:"GET"})
  .then((res)=>{return res.json(); })
  .then((data)=>{setreports(data)})
  
  },[])
  
  useEffect(()=>{
   const user = reports.find((u)=>u.id==uid)
  
if(user){
  const ur = user.report.find((r)=>r.reportId==rid)

  if(ur){
    setfrp(ur)
    setinptext(ur.Status)
  }
}

},[reports])

const [inptext,setinptext]=useState("")
 const handleChange=(e)=>{
    setinptext(e.target.value)
 }

 const handlesubmit=()=>{
  frp.Status=inptext;
  frp.date=dat
 
  const updaterep=reports.find(u=>u.id==uid)
  
  
    fetch(`https://waste-management-db-json.onrender.com/reports/${uid}`,
     {method:"PUT",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify(updaterep)
     })

     alert("update Successfully")
     navigate("/adminhome")

 }

 const handleback=()=>{
   navigate("/adminhome")
}

  
  return (
    <div>
      <button className='backbutton' onClick={handleback}><IoArrowBackOutline /></button>


        
        <center>
            <div id='edodiv'>
                <center id='edbox'>
                  <h1 id='urh'>Update Report</h1>
                    <h1>{frp.reportId}</h1>
                    <h1>{frp.area}</h1>
                     <label htmlFor="status">Status : <input type="text" id='status' value={inptext} style={{width:"70%"}} onChange={(e)=>{handleChange(e)}}/></label>
                     <input id='date' value={dat} onChange={(e)=>{setdat(e.target.value)}} type="date" />
                     <button onClick={()=>{handlesubmit()}}>Update</button>
                </center>
            </div>
        </center>
    </div>
  )
}

export default Adminedit