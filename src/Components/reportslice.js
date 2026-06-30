import {createSlice} from "@reduxjs/toolkit"

const initialState={
    userid: localStorage.getItem("userid") || null,
    reportid:localStorage.getItem("reportid") || null,
    tamil:localStorage.getItem("tamil") || false

}

const reportSlice=createSlice({
    name:"report",
    initialState,
    reducers:{
        setuserid:(state,action)=>{
          state.userid=action.payload.userid  
        },
        setreportid:(state,action)=>{
            state.reportid=action.payload.reportid
        },
        settamil:(state,action)=>{
            state.tamil=action.payload.tamil
        }
    }
})

export const {setuserid,setreportid,settamil}=reportSlice.actions;
export default reportSlice.reducer