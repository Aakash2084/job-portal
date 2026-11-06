import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getRecruiterStats = createAsyncThunk(
  "dashboard/getRecruiterStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/recruiter");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to fetch dashboard stats"
      );
    }
  }
);

export const getJobseekerStats = createAsyncThunk(
  "dashboard/getJobseekerStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/jobseeker");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to fetch jobseeker dashboard"
      );
    }
  }
);

export const getRecentApplications = createAsyncThunk(
  "dashboard/getRecentApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/dashboard/jobseeker/recent-applications"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to fetch recent applications"
      );
    }
  }
);

export const getRecruiterApplications = createAsyncThunk(
  "dashboard/getRecruiterApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/dashboard/recruiter/recent-applications"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to fetch recent applications"
      );
    }
  }
);

const initialState = {
  stats: null,
  recentApplications: [],
  recruiterApplications:[],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecruiterStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getRecruiterStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.dashboard;
        state.error = null;
      })

      .addCase(getRecruiterStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

.addCase(getJobseekerStats.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(getJobseekerStats.fulfilled, (state, action) => {
  state.loading = false;
  state.stats = action.payload.dashboard;
  state.error = null;
})

.addCase(getJobseekerStats.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(getRecentApplications.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(getRecentApplications.fulfilled, (state, action) => {
  state.loading = false;
  state.recentApplications = action.payload.applications;
  state.error = null;
})

.addCase(getRecentApplications.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(getRecruiterApplications.pending,(state)=>{
  state.loading=true;
  state.error = null;
})
.addCase(getRecruiterApplications.fulfilled,(state,action)=>{
  state.loading=false;
  state.recruiterApplications = action.payload.recruiterApplications;
  state.error =null;
})
.addCase(getRecruiterApplications.rejected,(state,action)=>{
  state.loading=false;
  state.error = action.payload;
})

  },
});

export default dashboardSlice.reducer;