
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyApplications,
  withdrawApplication
} from "../redux/slices/applicationSlice";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  LoaderCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { getTimeAgo } from "../components/Timer";

function MyApplications() {
  const dispatch = useDispatch();

  const { applications = [], loading, error } = useSelector(
    (state) => state.application
  );

  const [activeTab, setActiveTab] = useState("All Jobs");

  const tabs = ["All Jobs", "Accepted", "Pending", "Rejected"];

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const handleWithdraw = async (applicationId) => {
    const result = await dispatch(withdrawApplication(applicationId));

    if (withdrawApplication.fulfilled.match(result)) {
      toast.success("Application withdrawn successfully");
    } else {
      toast.error(result.payload || "Failed to withdraw application");
    }
  };

  const filteredApplications =
    activeTab === "All Jobs"
      ? applications
      : applications.filter(
          (application) => application.status === activeTab
        );

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
    <div className="px-3 py-6 sm:p-6 md:p-10 flex flex-col gap-5 min-w-0">
      <h1 className="font-bold text-2xl">My Applications</h1>

      <div className="flex gap-4 sm:gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 shrink-0 cursor-pointer text-sm font-medium ${
              activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-4">
        {filteredApplications.length === 0 ? (
          <p className="text-xs text-gray-500">
            {activeTab === "All Jobs"
              ? "You have not applied for any jobs yet."
              : `No ${activeTab.toLowerCase()} applications found.`}
          </p>
        ) : (
          filteredApplications.map((application) => (
            <div
              className="w-full min-w-0 p-3 sm:px-5 sm:py-3 border border-gray-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-lg"
              key={application._id}
            >
              <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                <div className="border-2 border-gray-200 h-12 w-12 shrink-0 rounded-lg flex justify-center items-center">
                  {application.job?.company?.logo ? (
                    <img
                      className="h-10 w-10 object-fill rounded"
                      src={application.job.company.logo}
                      alt="Company logo"
                    />
                  ) : (
                    <BriefcaseBusiness
                      size={22}
                      className="text-gray-400"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-0">
                  <h2 className="font-semibold text-sm break-words">
                    {application.job?.title || "Job title unavailable"}
                  </h2>

                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center gap-1 min-[420px]:gap-2">
                    <div className="flex items-center gap-1 min-w-0">
                      <BriefcaseBusiness
                        size={12}
                        className="font-bold text-gray-400 shrink-0"
                      />
                      <p className="text-xs text-gray-400 font-semibold break-words">
                        {application.job?.company?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 min-w-0">
                      <MapPin
                        size={12}
                        className="text-gray-400 shrink-0"
                      />
                      <p className="text-xs font-semibold text-gray-400 break-words">
                        {application.job?.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {application.job?.jobType && (
                      <p className="bg-blue-100 px-2 py-1 rounded-lg text-xs font-semibold text-blue-600">
                        {application.job.jobType}
                      </p>
                    )}

                    {application.job?.workmode && (
                      <p className="bg-green-100 py-1 px-2 rounded-lg text-xs font-semibold text-green-600">
                        {application.job.workmode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col min-[420px]:flex-row sm:flex-col justify-between sm:justify-center sm:items-end gap-3 sm:gap-2 pl-0 sm:pl-2">
                <div
                  className={`w-fit px-4 py-1 rounded-lg text-xs border font-medium ${
                    application.status === "Accepted"
                      ? "bg-green-100 border-green-300 text-green-600"
                      : application.status === "Pending"
                      ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                      : "bg-red-100 border-red-300 text-red-600"
                  }`}
                >
                  {application.status}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="text-indigo-500 shrink-0"
                  />
                  <p className="text-xs font-semibold text-gray-400">
                    Applied {getTimeAgo(application.createdAt)}
                  </p>
                </div>

                {application.status === "Pending" && (
                  <button
                    type="button"
                    onClick={() => handleWithdraw(application._id)}
                    className="text-xs font-semibold text-red-500  cursor-pointer border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition w-fit"
                  >
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyApplications;
