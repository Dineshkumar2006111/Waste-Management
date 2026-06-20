import {createSlice} from "@reduxjs/toolkit"

const initialState={
    userid: localStorage.getItem("userid") || null,
    reportid:localStorage.getItem("reportid") || null
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
        }
    }
})

export const {setuserid,setreportid}=reportSlice.actions;
export default reportSlice.reducer