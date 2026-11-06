
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slices/jobSlice";
import JobCard from "../components/JobCard";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

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

    setPage(1);
  };

  if (!authChecked) {
    return (
      <p className="text-sm p-4">
        Checking authentication...
      </p>
    );
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
    return <p className="p-4">{error}</p>;
  }

  return (
    <div className="w-full flex flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

      {/* Search and Filters */}
      <div className="w-full flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

        {/* Search Bar */}
        <div className="w-full xl:w-2/5 flex gap-2">

          <input
            className="min-w-0 flex-1 border-2 border-gray-200 text-sm font-semibold px-3 py-2.5 rounded-lg outline-none focus:border-indigo-400"
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setAppliedSearch(search);
              }
            }}
          />

          <button
            className="shrink-0 cursor-pointer text-sm font-semibold px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
            type="button"
            onClick={() => {
              setPage(1);
              setAppliedSearch(search);
            }}
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="w-full xl:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          <select
            className="w-full min-w-0 border-2 border-gray-200 text-sm font-semibold py-2.5 px-3 rounded-lg outline-none focus:border-indigo-400"
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
            className="w-full min-w-0 border-2 border-gray-200 text-sm font-semibold py-2.5 px-3 rounded-lg outline-none focus:border-indigo-400"
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
            className="w-full min-w-0 border-2 border-gray-200 text-sm font-semibold py-2.5 px-3 rounded-lg outline-none focus:border-indigo-400 sm:col-span-2 lg:col-span-1"
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

      {/* Jobs Count */}
      <h1 className="font-semibold text-sm sm:text-base">
        {allJobs.length} Jobs found.
      </h1>

      {/* Job Cards */}
      <div className="w-full flex flex-col gap-4">
        {allJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No jobs available.
          </p>
        ) : (
          allJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 flex-wrap mt-2">

        <button
          className="cursor-pointer text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="cursor-pointer text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Jobs;
