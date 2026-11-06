
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  MapPin,
} from "lucide-react";
import { getTimeAgo } from "../components/Timer";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full p-3 sm:p-4 border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-xl transition-all duration-300 hover:shadow-md hover:border-indigo-200"
    >
      {/* Left Section */}
      <div className="flex gap-3 sm:gap-4 min-w-0">

        {/* Company Logo */}
        <div className="border-2 border-gray-100 h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-lg flex justify-center items-center overflow-hidden">
          <img
            className="h-full w-full object-contain"
            src={job.company?.logo}
            alt={job.company?.name || "Company"}
          />
        </div>

        {/* Job Information */}
        <div className="flex flex-col gap-2 min-w-0">

          <h2 className="font-semibold text-sm sm:text-base break-words">
            {job.title}
          </h2>

          {/* Company and Location */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

            <div className="flex items-center gap-1 min-w-0">
              <BriefcaseBusiness
                size={12}
                className="shrink-0 text-gray-400"
              />
              <p className="text-xs text-gray-400 font-semibold">
                {job.company?.name}
              </p>
            </div>

            <div className="flex items-center gap-1 min-w-0">
              <MapPin
                size={12}
                className="shrink-0 text-gray-400"
              />
              <p className="text-xs font-semibold text-gray-400 break-words">
                {job.location}
              </p>
            </div>

          </div>

          {/* Job Type and Work Mode */}
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

      {/* Right Section */}
      <div className="flex flex-row sm:flex-col justify-between sm:items-end gap-3 sm:gap-2">

        {/* Posted Date */}
        <div className="flex items-center gap-2">
          <CalendarDays
            size={16}
            className="shrink-0 text-indigo-500"
          />

          <p className="text-xs font-semibold text-gray-400">
            Posted {getTimeAgo(job.createdAt)}
          </p>
        </div>

        {/* View Details Button */}
        <button
          className="shrink-0 cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          <Eye size={15} />
          View details
        </button>

      </div>
    </div>
  );
}

export default JobCard;
