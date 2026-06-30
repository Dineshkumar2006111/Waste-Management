import React, { useEffect, useState } from 'react'
import { data ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setreportid, setuserid } from './reportslice';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const dispatch=useDispatch()
  var [reports,setreports]=useState([])
const navigate=useNavigate()

  useEffect(()=>{
    fetch('https://waste-management-db-json.onrender.com/reports',{method:"GET"})
  .then((res)=>{return res.json(); })
  .then((data)=>{ setreports(data)})
  },[])
  

const handleid=(userid,reportid)=>{
  localStorage.setItem("userid",userid)
  localStorage.setItem("reportid",reportid)


    dispatch(setuserid({userid}))
    dispatch(setreportid({reportid}))
    navigate("/adminedit")
}


  return (
    <div>

      <nav id='adminnav'>
        <h1 style={{lineHeight:"50px",textAlign:"center",color:"white"}}>Waste Management</h1>
        
      </nav>




      <h2 style={{marginTop:"20px",marginLeft:"20px",fontSize:"30px"}}>Administer page</h2>
    {reports?.map((repor)=>{
      return(
        <div className='outeruserbox'>
        <div className='userbox' key={repor.id}>
          <h1>{repor.username}</h1>
          <h3 id='repp'>Reports:</h3>
          <div className='outerreportdiv'>
           {repor.report && repor.report.length!=0?
          repor.report?.map((rep)=>{
            return(
              <div className='innerreportdiv' key={rep.reportId}>
                <img src={rep.photoUrl} alt="loading..." />
                <center><h3 >Area : {rep.area}</h3>
                 <h3>Date : {rep.date}</h3>
                 <h3 style={{textDecoration:"underline"}}>Description:</h3>
                <h4>{rep.description}</h4>
                <h2 style={{marginTop:"5px"}}>Status : {rep.Status}</h2></center>
                <button onClick={()=>{handleid(repor.id,rep.reportId)}}>Edit Progress..</button>
              </div>
            )
          }):
          <h3 id='norep'>🧐 No report yet registered</h3>
          }
          </div>
        </div>
      </div>)
    })}

    </div>
  )
}

export default AdminHome