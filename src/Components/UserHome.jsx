import React, { useState,useEffect, useRef } from 'react'
import {useSelector} from "react-redux"
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setreportid, settamil } from './reportslice'
import { MdOutlineAddCard } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";

const UserHome = () => {
const navigate=useNavigate()
const userid=useSelector(state=>state.report.userid)
const tamil=useSelector(state=>state.report.tamil)



const dispatch=useDispatch();
// const reportid=useSelector(state=>state.report.reportid)
const [langs,setlangs]=useState(true)


  var [reports,setreports]=useState([])
  
   useEffect(()=>{
      fetch(`https://waste-management-db-json.onrender.com/reports/${userid}`,{method:"GET"})
    .then((res)=>{return res.json(); })
    .then((data)=>{setreports(data)})
    },[])

    const handledit=(id)=>{
      localStorage.setItem("reportid",id)
      dispatch(setreportid({reportid:id}))
      navigate("/useredit")
    }
    


    const hlang=useRef(null)
    const har=useRef(null)
    
const langme=()=>{
  hlang.current.style.display="block"
}
const langmd=()=>{
  hlang.current.style.display="none"
}
const arme=()=>{
  har.current.style.display="block"
}
const armd=()=>{
  har.current.style.display="none"
}
const lang=useRef(null)

const showlangm=()=>{
  
  setlangs(!langs)
  
    if(langs){
    hlang.current.style.display="none"
    lang.current.style.display="block"
  }else{
    lang.current.style.display="none"
  } 
}

    const nhar=useRef(null)
const narme=()=>{
  nhar.current.style.display="block"
}
const narmd=()=>{
  nhar.current.style.display="none"
}

const changetamil=()=>{
  console.log("tamil");
  
  localStorage.setItem("tamil",true)
  dispatch(settamil({tamil:true}))
  lang.current.style.display="none"
}
const changeenglish=()=>{
  console.log("english");
  
  localStorage.setItem("tamil",false)
  dispatch(settamil({tamil:false}))
  lang.current.style.display="none"
}


  return (
    <div>
      {tamil?(
          <div>

             <nav id='nav'>
        <h1 id='th' style={{lineHeight:"50px",marginLeft:"20px",color:"black"}}>கழிவு மேலாண்மை</h1>
        <ul>
            <Link id='langb' onClick={()=>showlangm()} onMouseEnter={langme} onMouseLeave={langmd} ><IoLanguage size={30} /></Link><p id='hlang' ref={hlang}>மொழி</p>
            <Link id='addb'  onMouseEnter={arme} onMouseLeave={armd} to={'/newreports'}><MdOutlineAddCard size={30} /></Link><p id='har' ref={har}>புகார் பதிவு</p>
        </ul>
      </nav>

      <Link id='naddb'  onMouseEnter={narme} onMouseLeave={narmd} to={'/newreports'}><MdOutlineAddCard size={40} /></Link><p id='nhar' ref={nhar}>புகார் பதிவு</p>
      <ul id='lang' ref={lang} >
        <li onClick={()=>{changetamil()}}>தமிழ்</li><hr />
        <li onClick={()=>{changeenglish()}}>English</li>
      </ul>

{reports.report && reports.report.length > 0 ?
    <div className='outerreportdiv'>{
    reports.report.map((rep)=>{
       return(
              <div className='innerreportdiv' key={rep.reportId}>
                <img src={rep.photoUrl} alt="loading..." />
                <center><h3 >பகுதி : {rep.area}</h3>
                 <h3>தேதி : {rep.date}</h3>
                 <h3 style={{textDecoration:"underline"}}>விளக்கம் :</h3>
                <h4>{rep.description}</h4>
                <h2 style={{marginTop:"5px"}}>நிலை : {rep.Status}</h2></center>
                <button onClick={()=>{handledit(rep.reportId)}}>திருத்து</button>
              </div>
            )
    }) }</div> :

    <center>
      <h3 id='unr' style={{marginTop:"15%",width:"90%"}}>வரவேற்கிறோம், {reports.username}. இதுவரை எந்த புகாரும் பதிவு செய்யப்படவில்லை. புதிய புகாரை பதிவு செய்ய கீழே உள்ள பொத்தானை அழுத்தவும்.</h3>
      <button id='addrep' onClick={()=>{navigate('/newreports')}}>புகார் பதிவு</button>
    </center>
  }
  </div>
      
         
      ):(
        <div>
    <nav id='nav'>
        <h1 style={{lineHeight:"50px",marginLeft:"20px",color:"black"}}>Waste Management</h1>
        <ul>
            <Link id='langb' onClick={()=>showlangm()} onMouseEnter={langme} onMouseLeave={langmd} ><IoLanguage size={30} /></Link><p id='hlang' ref={hlang}>Language</p>
            <Link id='addb'  onMouseEnter={arme} onMouseLeave={armd} to={'/newreports'}><MdOutlineAddCard size={30} /></Link><p id='har' ref={har}>Add report</p>
        </ul>
      </nav>
      <Link id='naddb'  onMouseEnter={narme} onMouseLeave={narmd} to={'/newreports'}><MdOutlineAddCard size={40} /></Link><p id='nhar' ref={nhar}>Add report</p>
      
      <ul id='lang' ref={lang} >
        <li onClick={()=>{changetamil()}}>தமிழ்</li><hr />
        <li onClick={()=>{changeenglish}}>English</li>
      </ul>
    {reports.report && reports.report.length > 0?
    <div className='outerreportdiv'>{
    reports.report.map((rep)=>{
       return(
              <div className='innerreportdiv' key={rep.reportId}>
                <img src={rep.photoUrl} alt="loading..." />
                <center><h3 >Area : {rep.area}</h3>
                 <h3>Date : {rep.date}</h3>
                 <h3 style={{textDecoration:"underline"}}>Description:</h3>
                <h4>{rep.description}</h4>
                <h2 style={{marginTop:"5px"}}>Status : {rep.Status}</h2></center>
                <button onClick={()=>{handledit(rep.reportId)}}>Edit Progress..</button>
              </div>
            )
    }) }</div> :

    <center>
      <h3 id='unr' style={{marginTop:"15%",width:"90%"}}>Welcom, {reports.username}. No report yet register to report issuse click the below button</h3>
      <button id='addrep' onClick={()=>{navigate('/newreports')}}>Add report</button>
    </center>
  }</div>
      )}
  
    </div>
  )
}

export default UserHome