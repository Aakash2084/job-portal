
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchJobById } from "../redux/slices/jobSlice";
import { applyForJob } from "../redux/slices/applicationSlice";
import { JobDescription, AboutCompany, Requirements } from "../../index";
import { getTimeAgo } from "../components/Timer";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaWhatsapp
} from "react-icons/fa";

import {
  BriefcaseBusiness,
  CalendarDays,
  User,
  MapPin,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Description");

  const tabs = [
    "Description",
    "About Company",
    "Requirements",
  ];

  const { selectedJob, loading: jobLoading, error: jobError } = useSelector(
    (state) => state.job
  );

  const {
    loading: applicationLoading,
    error: applicationError,
    success
  } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  const shareUrl = window.location.href;

  const shareJob = (platform) => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(
      `Check out this job: ${selectedJob.title}`
    );

    const shareLinks = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };

    window.open(
      shareLinks[platform],
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleApply = async () => {
    const result = await dispatch(applyForJob(id));

    if (applyForJob.fulfilled.match(result)) {
      toast.success("Application submitted successfully");
    }

    if (applyForJob.rejected.match(result)) {
      toast.error(result.payload);
    }
  };

  if (jobLoading) {
    return <p className="p-5">Loading job...</p>;
  }

  if (jobError) {
    return <p className="p-5">{jobError}</p>;
  }

  if (!selectedJob) {
    return <p className="p-5">Job not found.</p>;
  }

  return (
    <div className="p-3 sm:p-5 flex flex-col gap-5 min-w-0">

      <div className="p-3 sm:p-4 border border-gray-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 rounded-xl min-w-0">

        <div className="flex items-start gap-3 min-w-0">
          <div className="border-2 border-gray-100 h-12 w-12 shrink-0 rounded-lg flex justify-center items-center">
            {selectedJob.company?.logo && (
              <img
                className="h-10 w-10 object-contain"
                src={selectedJob.company.logo}
                alt="Company logo"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <h2 className="font-semibold text-sm break-words">
              {selectedJob.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <BriefcaseBusiness
                size={12}
                className="font-bold text-gray-400 shrink-0"
              />

              <p className="text-xs text-gray-400 font-semibold break-words">
                {selectedJob.company?.name}
              </p>

              <MapPin size={12} className="text-gray-400 shrink-0" />

              <p className="text-xs font-semibold text-gray-400 break-words">
                {selectedJob.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <p className="bg-blue-100 px-2 py-1 rounded-lg text-xs font-semibold text-blue-600">
                {selectedJob.jobType}
              </p>

              <p className="bg-green-100 py-1 px-2 rounded-lg text-xs font-semibold text-green-600">
                {selectedJob.workmode}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-indigo-500 shrink-0" />

            <p className="text-xs font-semibold text-gray-400">
              Posted {getTimeAgo(selectedJob.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <User size={20} className="text-indigo-500 shrink-0" />

            <button
              className="w-full sm:w-auto cursor-pointer text-xs font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleApply}
              disabled={applicationLoading}
            >
              {applicationLoading ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </div>

      </div>

      <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 shrink-0 cursor-pointer text-sm font-medium whitespace-nowrap ${
              activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-5 min-w-0">

        <div className="w-full lg:w-2/3 mt-2 lg:mt-6 min-w-0">
          {activeTab === "Description" && (
            <JobDescription />
          )}

          {activeTab === "About Company" && (
            <AboutCompany />
          )}

          {activeTab === "Requirements" && (
            <Requirements />
          )}
        </div>

        <div className="w-full lg:w-1/4 lg:max-w-xs h-fit self-start p-4 sm:p-5 border-2 border-gray-200 rounded-lg shadow-lg flex flex-col gap-3 hover:shadow-xl min-w-0">

          <div className="flex flex-col gap-3">

            <div>
              <h1 className="font-semibold">Experience</h1>
              <h2 className="font-medium opacity-90 text-sm break-words">
                {selectedJob.experienceLevel}
              </h2>
            </div>

            <div>
              <h1 className="font-semibold">Salary</h1>
              <h2 className="font-medium opacity-90 text-sm break-words">
                {selectedJob.salary}rs
              </h2>
            </div>

            <div>
              <h1 className="font-semibold">JobType</h1>
              <h2 className="font-medium opacity-90 text-sm break-words">
                {selectedJob.jobType}
              </h2>
            </div>

            <div>
              <h1 className="font-semibold">Workmode</h1>
              <h2 className="font-medium opacity-90 text-sm break-words">
                {selectedJob.workmode}
              </h2>
            </div>

          </div>

          <div className="border-t border-gray-400 pt-4 mt-2">

            <h3 className="font-bold text-sm mb-3">
              Share this job
            </h3>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() => shareJob("linkedin")}
                className="bg-[#0A66C2] text-white p-2 rounded-md cursor-pointer hover:opacity-80"
              >
                <FaLinkedinIn size={18} />
              </button>

              <button
                onClick={() => shareJob("twitter")}
                className="bg-[#1DA1F2] text-white p-2 rounded-md cursor-pointer hover:opacity-80"
              >
                <FaTwitter size={18} />
              </button>

              <button
                onClick={() => shareJob("facebook")}
                className="bg-[#1877F2] text-white p-2 rounded-md cursor-pointer hover:opacity-80"
              >
                <FaFacebookF size={18} />
              </button>

              <button
                onClick={() => shareJob("whatsapp")}
                className="bg-[#25D366] text-white p-2 rounded-md cursor-pointer hover:opacity-80"
              >
                <FaWhatsapp size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;

