import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const applyForJob = createAsyncThunk(
    'application/applyForJob',
    async(jobId,{rejectWithValue})=>{
        try {
            const responce = await api.post(`/application/apply/${jobId}`);
            return responce.data;
        } catch (error) {
            return rejectWithValue(
            error?.responce?.data?.msg || "failed to apply job"
            )
        }
    }
);

export const getMyApplications = createAsyncThunk(
    'application/getMyApplications',
    async(_,{rejectWithValue})=>{
        try {
            const responce = await api.get('/application/my-applications')
            return responce.data;
        } catch (error) {
            return rejectWithValue(
                error?.responce?.data?.msg || "Applications not found"
            )
        }
    }
);

export const getApplicants = createAsyncThunk(
    "application/getApplicants",
    async(jobId,{rejectWithValue})=>{
        try {
            const responce = await api.get(`/application/job/${jobId}`)
            return responce.data;
        } catch (error) {
            return rejectWithValue(
                error?.responce?.data?.msg || "Failed to fetch applicants"
            )
        }
    }
);

export const updateApplicationStatus = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/application/${applicationId}/status`,
        { status }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.responce?.data?.msg ||
        error?.responce?.data?.message ||
        "Failed to update application status"
      );
    }
  }
);

export const withdrawApplication = createAsyncThunk(
    "appliication/withdrawApplication",
    async(applicationId,{rejectWithValue})=>{
        try {
            const responce = await api.delete(`/application/${applicationId}`)
  return {
        ...responce.data,
        applicationId,
      };
        } catch (error) {
            return rejectWithValue(
                errror?.responce?.data?.msg || "Failed to withdraw application"
            )
        }
    }
)


const initialState = {
    applications:[],
    loading:false,
    error:null,
    success:false,
}

const applicationSlice = createSlice({
    name:"application",
    initialState,
    reducers:{
        clearApplicationError :(state)=>{
            state.error = null;
        },
        clearApplicationSuccess:(state)=>{
            state.success = false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(applyForJob.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(applyForJob.fulfilled,(state)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(applyForJob.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
            state.success = false;
        })


        .addCase(getMyApplications.pending,(state)=>{{
            state.loading = true;
            state.error= null;
          
        }})
        .addCase(getMyApplications.fulfilled,(state,action)=>{
          state.loading = false;
          state.error = null;
          state.applications = action.payload.applications;
        })
        .addCase(getMyApplications.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(getApplicants.pending,(state)=>{
            state.loading = true;
            state.error = null;
    
        })
        .addCase(getApplicants.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.applications = action.payload.applications;
        })
        .addCase(getApplicants.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(updateApplicationStatus.pending,(state)=>{
            state.loading = true;
            state.error = null;
            
        })
       .addCase(updateApplicationStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  const updatedApplication = action.payload.application;

  const index = state.applications.findIndex(
    (application) =>
      application._id === updatedApplication._id
  );

  if (index !== -1) {
    state.applications[index].status =
      updatedApplication.status;
  }
})
        .addCase(updateApplicationStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


    .addCase(withdrawApplication.pending,(state)=>{
        state.loading = true;
        state.error = null;
       
    })
   .addCase(withdrawApplication.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  state.applications = state.applications.filter(
    (application) =>
      application._id !== action.payload.applicationId
  );
})
    .addCase(withdrawApplication.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    })


    }
})

export const {clearApplicationError,clearApplicationSuccess} = applicationSlice.actions;

export default applicationSlice.reducer;