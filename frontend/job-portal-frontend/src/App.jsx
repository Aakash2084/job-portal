
import './App.css'
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {Signup,Login,Applicants,Home,MyJobs,Dashboard,ProtectedRoute,Jobs,JobDetails,MyApplications,CreateJob,EditJob,Profile,RegisterCompany} from '../index'
import { getProfile } from './redux/slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'


function App() {

  const dispatch = useDispatch();

  const { isAuthenticated, authChecked } = useSelector(
  (state) => state.auth
);

  useEffect(()=>{
      dispatch(getProfile())
  },[dispatch])

  return (
   <BrowserRouter>
      
   <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/signup' element={<Signup/>} />
        <Route
  path="/login"
  element={
    !authChecked ? (
      <p>Checking session...</p>
    ) : isAuthenticated ? (
      <Navigate to="/" replace />
    ) : (
      <Login />
    )
  }
/>
            <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
  <Dashboard/>
              </ProtectedRoute>
        
            } />
            
      <Route path='/jobs' element={<Jobs/>} />

      <Route path='/jobs/:id' element={<JobDetails/>} />

      <Route
  path="/my-applications"
  element={
     <ProtectedRoute allowedRoles={["jobseeker"]}>
      <MyApplications />
    </ProtectedRoute>
  }
/>

<Route
 path='/my-jobs'
  element={
     <ProtectedRoute allowedRoles={["recruiter"]}>
 <MyJobs/>
    </ProtectedRoute>
 } />

<Route
  path="/job/:jobId/applicants"
  element={
     <ProtectedRoute allowedRoles={["recruiter"]}>
      <Applicants />
    </ProtectedRoute>

  }
/>

<Route
  path="/create-job"
  element={
     <ProtectedRoute allowedRoles={["recruiter"]}>
      <CreateJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-job/:id"
  element={
      <ProtectedRoute allowedRoles={["recruiter"]}>
      <EditJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/register-company"
  element={
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <RegisterCompany />
    </ProtectedRoute>
  }
/>

  </Routes>
  
   </BrowserRouter>
  )
}

export default App
