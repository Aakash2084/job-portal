import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import api from '../../services/api'

// signup

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async(userData,{rejectWithValue})=>{
try {
      const response = await api.post("/user/signup",userData);
        return response.data;
} catch (error) {
   return rejectWithValue(
    error.response?.data?.msg ||
    "signup failed"
   )
}
    }
)
// login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(userData,{rejectWithValue})=>{
        try {
            const response = await api.post("/user/login",userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.msg ||
                "login failed"
            )
        }
    }
)
// get profile
export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async(_,{rejectWithValue})=>{
        try {
           const response = await api.get("/user/profile");
           return response.data; 
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.msg
|| "failed to get profile"            )
        }
    }
)

// logout
export const logout = createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue})=>{
        try {
             const response = await api.post("/user/logout");
        return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.msg 
            || "failed to logout"
            )
        }
       
    }
)



const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,
  error: null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
    clearError:(state)=>{
state.error =null;
    }},
    extraReducers: (builder)=>{
        // signip
        builder
        .addCase(signupUser.pending,(state)=>{
           state.loading =true;
           state.error = null;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
          state.loading = false;
          state.error = null;
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload
        });
// login
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading= true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error= null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        })

// Get profile
builder
  .addCase(getProfile.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(getProfile.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.isAuthenticated = true;
    state.loading = false;
    state.authChecked = true;
    state.error = null;
  })
  .addCase(getProfile.rejected, (state, action) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.authChecked = true;
    state.error = action.payload;
  });

    // logout
   builder
   .addCase(logout.pending,(state)=>{
    state.loading = true;
   })
   .addCase(logout.fulfilled,(state)=>{
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
   })
   .addCase(logout.rejected,(state,action)=>{
    state.error = action.payload;
    state.loading = false;
   })

    }
})

export const {clearError} = authSlice.actions;
export default authSlice.reducer;