import { Description } from '@mui/icons-material'
import React,{useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const Useredit = () => {

    const [loading,setloading]=useState(false)
  const [sh,setsh]=useState(true)
 const navigate=useNavigate()
  const userid=useSelector(state=>state.report.userid)
  const reportid=useSelector(state=>state.report.reportid)

  const [user,setuser]=useState([])
  const [isload,setisload]=useState(false)

 var [state,setstate]=useState({
    area:"",
    description:"",
    photoUrl:"",
    date:"",
    
  })

 useEffect(()=>{
    fetch(`http://localhost:4000/reports/${userid}`,{method:"GET"})
    .then(res=>res.json())
    .then(data=>setuser(data))
 },[])
useEffect(()=>{
    if(user.report){
        const userrep=user.report.find(r=>r.reportId==reportid)
        setstate({area:userrep.area,
            description:userrep.description,
            photoUrl:userrep.photoUrl,
            date:userrep.date

        })
         
    }
},[user])

 const handleChange=(e)=>{
    setstate({...state,[e.target.name]:e.target.value})
 }  

// useEffect(()=>{console.log(state)},[state])

var handleimage= async (e)=>{
  setisload(true)
 const file=e.target.files[0];
 if(!file) return;
 
  const data=new FormData();

  data.append("file",file)
  data.append("upload_preset","Waste_image")
  data.append("cloud_name","dafedlnag")

   const res= await fetch("https://api.cloudinary.com/v1_1/dafedlnag/image/upload",{
      method:"POST",
      body:data
    })
    const imageurl=await res.json();
    
    if(imageurl.secure_url){
        setstate({...state,photoUrl:imageurl.secure_url})
       
    }
}

useEffect(()=>{setisload(false);},[state.photoUrl])


const handlesubmit=()=>{

  const updatedReports = user.report.map((rep) => {
    if (rep.reportId === reportid) {
      return {
        ...rep,
        area: state.area,
        description: state.description,
        photoUrl: state.photoUrl,
        date: state.date
      };
    }
    return rep;
  });

fetch(`http://localhost:4000/reports/${userid}`,
     {method:"PUT",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({...user,
        report:updatedReports
       }
        
       )
     })

     alert("Edited Successfully")
     navigate("/userhome")

}

const handleback=()=>{
   navigate("/userhome")
}

const hlm=useRef(null)
const showme=()=>{
  hlm.current.style.display="block"
}
const showml=()=>{
  hlm.current.style.display="none"
}

const detloc=()=>{
  hlm.current.style.display="none"
  setloading(true)
  if('geolocation' in navigator){
      
        navigator.geolocation.getCurrentPosition(async(pos)=>{
            let lat=pos.coords.latitude
            let lon=pos.coords.longitude
            

             const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
    );
     const data = await res.json();
    const address = data.address;
    setloading(false)
      setstate({...state,area:address.residential})
  })}

}

  return (
    <div>
          <button className='backbutton' onClick={handleback}><IoArrowBackOutline /></button>
        <center>
        <div id='nrdiv'>
          <h1 id='nrh'>Edit report</h1>
            <span style={{position:"relative"}} ><input type="text" className='inp'  name='area'  value={state.area} placeholder='Area' onChange={(e)=>{handleChange(e)}}/><h3 id='locb' onMouseEnter={showme} onMouseLeave={showml} onClick={detloc}><MdLocationOn /></h3><p id='hlm' ref={hlm}>Auto location Detection</p>{loading && <p id='hlom'>Loading...</p>}</span>
           <input type="text" className='inp' name='description'  value={state.description} placeholder='Description' onChange={(e)=>{handleChange(e)}}/> 
            <input type="date" className='inp'  name='date' value={state.date}  onChange={(e)=>{handleChange(e)}}/>
            <h4>Report by Image</h4>
            <input type="file" id='fs' onChange={(e)=>{handleimage(e)}}/>
            
            {isload ? <b>Wait a sec...</b>:<button onClick={()=>{handlesubmit()}}>Edit report</button>}
            </div>
        </center>

    </div>
  )
}

export default Useredit

//data field la change agala