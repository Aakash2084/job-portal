import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (
    { search = "", page = 1, limit = 10, jobType = "", workmode = "", experienceLevel = "" } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/job", {
        params: {
          search,
          page,
          limit,
          jobType,
          workmode,
          experienceLevel,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to fetch jobs"
      );
    }
  }
);

export const fetchJobById = createAsyncThunk(
    "/job/fetchJobById",
    async(jobId,{rejectWithValue})=>{
        try {
          const responce = await api.get(`/job/${jobId}`) ;
          return responce.data;
        } catch (error) {
            return rejectWithValue(
                error?.responce?.data?.msg || 'failed to fetch job'
            )
        }
    }
);

export const getMyJobs = createAsyncThunk(
    "job/getMyJobs",
    async(_,{rejectWithValue})=>{
        try {
           const responce = await api.get("/job/my-jobs") 
           return responce.data;
        } catch (error) {
            return rejectWithValue(
                error?.responce?.data?.msg || "Failed to fetch your jobs"
            )
        }
    }
)

export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post("/job", jobData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to create job"
      );
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/job/${jobId}`,
        jobData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to update job"
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/job/${jobId}`);

      return {
        ...response.data,
        jobId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to delete job"
      );
    }
  }
);

const initialState = {
  allJobs: [],
  myJobs: [],
  openJobs:[],
  pausedJobs:[],
  closedJobs:[],
  selectedJob: null,
  currentPage: 1,
  totalPages: 1,
  totalJobs: 0,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder
        .addCase(fetchJobs.pending,(state)=>{
            state.loading=true;
            state.error = null;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
  state.loading = false;

  state.allJobs = action.payload.jobs;
  state.currentPage = action.payload.currentPage;
  state.totalPages = action.payload.totalPages;
  state.totalJobs = action.payload.totalJobs;

  state.error = null;
})
        .addCase(fetchJobs.rejected,(state,action)=>{
             state.loading = false;
             state.error = action.payload;
        })

        .addCase(fetchJobById.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchJobById.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectedJob = action.payload.job;
        })
        .addCase(fetchJobById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(getMyJobs.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
      .addCase(getMyJobs.fulfilled, (state, action) => {
  state.loading = false;

  const jobs = Array.isArray(action.payload.jobs)
    ? action.payload.jobs
    : [];

  state.myJobs = jobs;

  state.openJobs = jobs.filter(
    (job) => job.status === "Open"
  );

  state.pausedJobs = jobs.filter(
    (job) => job.status === "Paused"
  );

  state.closedJobs = jobs.filter(
    (job) => job.status === "Closed"
  );

  state.error = null;
})
        .addCase(getMyJobs.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(createJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(createJob.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  state.myJobs.unshift(action.payload.job);
})

.addCase(createJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


.addCase(updateJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(updateJob.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  const updatedJob = action.payload.job;

  const index = state.myJobs.findIndex(
    (job) => job._id === updatedJob._id
  );

  if (index !== -1) {
    state.myJobs[index] = updatedJob;
  }

  const allJobsIndex = state.allJobs.findIndex(
    (job) => job._id === updatedJob._id
  );

  if (allJobsIndex !== -1) {
    state.allJobs[allJobsIndex] = updatedJob;
  }

  if (state.selectedJob?._id === updatedJob._id) {
    state.selectedJob = updatedJob;
  }
})

.addCase(updateJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


.addCase(deleteJob.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(deleteJob.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;

  const deletedJobId = action.payload.jobId;

  state.myJobs = state.myJobs.filter(
    (job) => job._id !== deletedJobId
  );

  state.allJobs = state.allJobs.filter(
    (job) => job._id !== deletedJobId
  );

  if (state.selectedJob?._id === deletedJobId) {
    state.selectedJob = null;
  }
})

.addCase(deleteJob.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

    }
})

export default jobSlice.reducer;

