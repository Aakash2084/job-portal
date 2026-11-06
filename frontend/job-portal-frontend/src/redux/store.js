import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import applicationReducer from './slices/applicationSlice'
import dashboardReducer from './slices/dashboardSlice'

export  const store = configureStore({

    reducer:{
       auth:authReducer,
       job:jobReducer,
       application:applicationReducer,
       dashboard: dashboardReducer,
    },

});

