
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slices/jobSlice";
import JobCard from '../components/JobCard'
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {LoaderCircle} from "lucide-react"

const Jobs = () => {
  const dispatch = useDispatch();
  

 const { isAuthenticated, authChecked } = useSelector(
  (state) => state.auth
);



const {
  allJobs,
  loading,
  error,
  currentPage,
  totalPages,
} = useSelector((state) => state.job);

const [search, setSearch] = useState("");
const [appliedSearch, setAppliedSearch] = useState("");

  const [filters, setFilters] = useState({
  jobType: "",
  workmode: "",
  experienceLevel: "",
});

const [page, setPage] = useState(1);

useEffect(() => {
  if (!authChecked || !isAuthenticated) return;

  dispatch(
    fetchJobs({
      search: appliedSearch,
      page,
      limit: 10,
      jobType: filters.jobType,
      workmode: filters.workmode,
      experienceLevel: filters.experienceLevel,
    })
  );
}, [
  dispatch,
  authChecked,
  isAuthenticated,
  page,
  appliedSearch,
  filters.jobType,
  filters.workmode,
  filters.experienceLevel,
]);

  const handleFilterChange = (e) => {
  const { name, value } = e.target;

  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};

if (!authChecked) {
  return <p className="text-sm" >Checking authentication...</p>;
}


if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <LoaderCircle
        size={40}
        className="text-indigo-600 animate-spin"
      />
    </div>
  );
}

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" p-10 w-full   flex flex-col gap-5 " >
     <div className=" w-full flex justify-between " >
<div className="w-1/2 flex gap-2" >
  <input
className="border-2 border-gray-200 text-sm font-semibold px-2 py-2 w-2/3  rounded-lg "
  type="text"
  placeholder="Search jobs..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<button
 className=" cursor-pointer text-sm font-semibold py-2 w-1/5 rounded-lg
  bg-gradient-to-r from-indigo-400 to-violet-500
  text-white border border-indigo-300
  transition-all duration-300
  hover:bg-none hover:bg-white
  hover:text-black "
  type="button"
  onClick={() => {
    setPage(1);
    setAppliedSearch(search);
  }}
>
  Search
</button>
</div>
<div className=" w-1/2 flex justify-end  gap-4" >
  <select
      className="border-2 border-gray-200 text-sm font-semibold py-2 px-3 rounded-lg "
  name="jobType"
  value={filters.jobType}
  onChange={handleFilterChange}
>
  <option value="">All Job Types</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
  <option value="Internship">Internship</option>
  <option value="Contract">Contract</option>
</select>

<select
className="border-2 border-gray-200 text-sm font-semibold py-2 px-3 rounded-lg "
  name="workmode"
  value={filters.workmode}
  onChange={handleFilterChange}
>
  <option value="">All Work Modes</option>
  <option value="Remote">Remote</option>
  <option value="Hybrid">Hybrid</option>
  <option value="On-site">On-site</option>
</select>

<select
className="border-2 border-gray-200 text-sm font-semibold py-2 px-3 rounded-lg "
  name="experienceLevel"
  value={filters.experienceLevel}
  onChange={handleFilterChange}
>
  <option value="">All Experience Levels</option>
  <option value="0">Fresher</option>
  <option value="1">1 Year</option>
  <option value="2">2 Years</option>
  <option value="3">3 Years</option>
  <option value="4">4 Years</option>
</select>
</div>
    
     </div>


     <h1 className="font-semibold" >{allJobs.length} Jobs found.</h1>

     <div className=" flex flex-col gap-4 " >
       {allJobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        allJobs.map((job) => (
         <JobCard key={job._id}  job={job} />
        ))
      )}
     </div>

   

    <div className="flex justify-center gap-2 " >
  <button
   className=" cursor-pointer text-xs font-semibold py-2 px-4 rounded-lg
  bg-gradient-to-r from-indigo-400 to-violet-500
  text-white border border-indigo-300
  transition-all duration-300
  hover:bg-none hover:bg-white
  hover:text-black "
    disabled={currentPage === 1}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Previous
  </button>

  <span className="font-semibold" >
    Page {currentPage} of {totalPages}
  </span>

  <button
   className=" cursor-pointer text-xs font-semibold py-2 px-4 rounded-lg
  bg-gradient-to-r from-indigo-400 to-violet-500
  text-white border border-indigo-300
  transition-all duration-300
  hover:bg-none hover:bg-white
  hover:text-black "
    disabled={currentPage === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Jobs;