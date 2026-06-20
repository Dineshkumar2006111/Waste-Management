import {configureStore} from "@reduxjs/toolkit"
import reportReducer from "./reportslice"

export const store=configureStore({
    reducer:{
        report:reportReducer
    }
})