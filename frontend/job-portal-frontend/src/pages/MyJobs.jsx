import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyJobs, deleteJob } from "../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  FolderClosed,
  MapPin,
  Users,
} from "lucide-react";
import { getTimeAgo } from "../components/Timer";

function MyJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    myJobs = [],
    openJobs = [],
    pausedJobs = [],
    closedJobs = [],
    loading,
    error,
  } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    const result = await dispatch(deleteJob(jobId));

    if (deleteJob.fulfilled.match(result)) {
      toast.success("Job deleted successfully");
    }

    if (deleteJob.rejected.match(result)) {
      toast.error(result.payload || "Failed to delete job");
    }
  };

  if (loading) {
    return <p className="p-5">Loading your jobs...</p>;
  }

  if (error) {
    return <p className="p-5">{error}</p>;
  }

  return (
    <div className="p-3 sm:p-5 flex flex-col gap-6 sm:gap-10 min-w-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 bg-indigo-500 rounded-xl flex justify-center items-center">
            <BriefcaseBusiness size={28} className="text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-2xl sm:text-3xl">MY Jobs</h1>
            <h3 className="text-xs font-semibold text-gray-700">
              Manage and track all your Jobs in one place.
            </h3>
          </div>
        </div>

        <button
          className="w-full sm:w-auto cursor-pointer text-sm font-medium py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
          onClick={() => navigate("/create-job")}
        >
          + Create new job
        </button>
      </div>

      <div className="bg-white border border-indigo-100 rounded p-2 sm:p-3 flex flex-col gap-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="min-w-0 min-h-16 px-2 sm:px-3 border border-indigo-300 rounded-lg bg-indigo-50 flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-indigo-200 border border-indigo-300 flex justify-center items-center">
              <BriefcaseBusiness size={20} className="font-bold text-indigo-600" />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-xs text-gray-600">Total Jobs</h2>
              <h3 className="font-semibold text-xl">{myJobs.length}</h3>
            </div>
          </div>

          <div className="min-w-0 min-h-16 px-2 sm:px-3 border border-green-300 rounded-lg bg-green-50 flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-green-200 border border-green-300 flex justify-center items-center">
              <Eye size={20} className="text-green-700" />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-xs text-gray-600">Open Jobs</h2>
              <h3 className="font-semibold text-xl">{openJobs.length}</h3>
            </div>
          </div>

          <div className="min-w-0 min-h-16 px-2 sm:px-3 border border-yellow-300 rounded-lg bg-yellow-50 flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-yellow-200 border border-yellow-300 flex justify-center items-center">
              <Eye size={20} className="text-yellow-700" />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-xs text-gray-600">Paused Jobs</h2>
              <h3 className="font-semibold text-xl">{pausedJobs.length}</h3>
            </div>
          </div>

          <div className="min-w-0 min-h-16 px-2 sm:px-3 rounded-lg border border-red-300 bg-red-50 flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-red-200 border border-red-300 flex justify-center items-center">
              <FolderClosed size={20} className="font-bold text-red-600" />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-xs text-gray-600">Closed Jobs</h2>
              <h3 className="font-semibold text-xl">{closedJobs.length}</h3>
            </div>
          </div>
        </div>

        {myJobs.length === 0 ? (
          <p className="font-semibold p-2">
            You have not created any job yet.
          </p>
        ) : (
          myJobs.map((job) => (
            <div
              className="p-3 sm:p-2 border border-indigo-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 rounded min-w-0"
              key={job._id}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="border-2 border-gray-100 h-12 w-12 shrink-0 rounded-lg flex justify-center items-center">
                  <img
                    className="h-10 w-10 object-fill rounded-lg"
                    src={job.company?.logo || ""}
                    alt="logo"
                  />
                </div>

                <div className="flex flex-col gap-2 min-w-0">
                  <h2 className="font-semibold text-sm break-words">
                    {job.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <BriefcaseBusiness
                      size={12}
                      className="font-bold text-gray-400 shrink-0"
                    />
                    <p className="text-xs text-gray-400 font-semibold break-words">
                      {job.company?.name}
                    </p>

                    <MapPin size={12} className="text-gray-400 shrink-0" />
                    <p className="text-xs font-semibold text-gray-400 break-words">
                      {job.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <p className="bg-blue-100 px-2 py-1 rounded-lg text-xs font-semibold text-blue-600">
                      {job.jobType}
                    </p>
                    <p className="bg-green-100 py-1 px-2 rounded-lg text-xs font-semibold text-green-600">
                      {job.workmode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:gap-2">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-indigo-500 shrink-0" />
                  <button
                    className="w-full sm:w-auto cursor-pointer text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                    onClick={() => navigate(`/job/${job._id}/applicants`)}
                  >
                    View Applicants
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={20}
                    className="text-indigo-500 shrink-0"
                  />
                  <p className="text-xs font-semibold text-gray-400">
                    Posted {getTimeAgo(job.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex md:justify-center">
                <p
                  className={
                    job.status === "Open"
                      ? "px-5 py-1 bg-green-200 rounded-lg border border-green-300 text-green-600 font-semibold text-xs text-center"
                      : job.status === "Paused"
                      ? "px-5 py-1 bg-yellow-200 rounded-lg border border-yellow-300 text-yellow-700 font-semibold text-xs text-center"
                      : "px-5 py-1 bg-red-200 rounded-lg border border-red-300 text-red-600 font-semibold text-xs text-center"
                  }
                >
                  {job.status}
                </p>
              </div>

              <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
                <button
                  className="cursor-pointer text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white border border-green-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                >
                  Edit Job
                </button>

                <button
                  className="cursor-pointer text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white border border-red-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete Job
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyJobs;