import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getApplicants,
  updateApplicationStatus,
} from "../redux/slices/applicationSlice";
import { toast } from "react-toastify";

import {
  ArrowLeft,
  Users2,
  BriefcaseBusiness,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Check,
  X,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Applicants = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applications, loading, error } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(getApplicants(jobId));
  }, [dispatch, jobId]);

  const handleStatusUpdate = async (applicationId, status) => {
    const result = await dispatch(
      updateApplicationStatus({
        applicationId,
        status,
      })
    );

    if (updateApplicationStatus.fulfilled.match(result)) {
      toast.success(`Application ${status} successfully`);
      dispatch(getApplicants(jobId));
    } else {
      toast.error(result.payload || "Failed to update status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return {
          style: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };

      case "rejected":
        return {
          style: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
        };

      default:
        return {
          style: "bg-amber-100 text-amber-700 border-amber-200",
          icon: Clock3,
        };
    }
  };

  const acceptedCount = applications.filter(
    (app) => app.status?.toLowerCase() === "accepted"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status?.toLowerCase() === "rejected"
  ).length;

  const pendingCount = applications.filter(
    (app) => app.status?.toLowerCase() === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#FAFBFF] px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/my-jobs")}
          className="group mb-8 cursor-pointer flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-950 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:bg-indigo-50 hover:shadow-md"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Jobs
        </button>

        {/* Page Heading */}
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
              <Users2 size={32} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Applicants
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                Review and manage applicants for this job.
              </p>
            </div>
          </div>

          {/* Job Summary */}
          <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-5 shadow-sm lg:min-w-[300px]">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <BriefcaseBusiness size={25} />
            </div>

            <div>
              <p className="text-sm font-bold text-indigo-950">
                Job Applications
              </p>
              <p className="text-xs text-slate-500">
                Applicant overview
              </p>
            </div>

            <div className="ml-auto border-l border-indigo-200 pl-5">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-2xl font-extrabold text-indigo-700">
                {applications.length}
              </p>
            </div>
          </div>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock3 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending</p>
              <h2 className="text-2xl font-bold text-slate-900">
                {pendingCount}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Accepted</p>
              <h2 className="text-2xl font-bold text-slate-900">
                {acceptedCount}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Rejected</p>
              <h2 className="text-2xl font-bold text-slate-900">
                {rejectedCount}
              </h2>
            </div>
          </div>

        </div>

        {/* Applicants List */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            All Applicants
          </h2>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
            {applications.length} Candidates
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-indigo-100 bg-white py-16 text-center shadow-sm">
            <p className="font-semibold text-indigo-600">
              Loading applicants...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white py-12 text-center text-red-600 shadow-sm">
            {error}
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-indigo-200 bg-white px-5 py-16 text-center shadow-sm">
            <Users2 size={45} className="mx-auto mb-4 text-indigo-300" />

            <h3 className="text-xl font-bold text-slate-800">
              No Applicants Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Applicants will appear here when someone applies for this job.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">

            {applications.map((application) => {
              const statusData = getStatusStyle(application.status);
              const StatusIcon = statusData.icon;
              const isPending =
                application.status?.toLowerCase() === "pending";

              const skills =
                application.applicant?.profile?.skills || [];

              return (
                <div
                  key={application._id}
                  className="group rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-6"
                >

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1.3fr_0.8fr_0.8fr] lg:items-center">

                    {/* Applicant Information */}
                    <div className="flex items-center gap-4">
                     <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-indigo-100 bg-indigo-100 shadow-md transition-transform duration-300 group-hover:scale-105">
  <img
    src={application.applicant?.profile?.profilePhoto}
    alt={application.applicant?.fullName || "Applicant"}
    className="h-full w-full rounded-full object-fill object-center"
  />
</div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-slate-900">
                          {application.applicant?.fullName || "Unknown Applicant"}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <Mail size={15} className="shrink-0 text-indigo-500" />
                          <span className="break-all">
                            {application.applicant?.email || "No email"}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <Phone size={15} className="shrink-0 text-indigo-500" />
                          <span>
                            {application.applicant?.phone || "No phone"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="border-t border-indigo-100 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <h4 className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-bold text-indigo-700">
                        Skills
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                          skills.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-900 transition-colors hover:bg-indigo-100"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">
                            No skills added
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Resume */}
                    <div className="border-t border-indigo-100 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-800">
                        <FileText size={18} className="text-indigo-600" />
                        Resume
                      </h4>

                      {application.applicant?.profile?.resume ? (
                        <a
                          href={application.applicant.profile.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                        >
                          View Resume
                          <ExternalLink size={15} />
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">
                          No resume uploaded
                        </span>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="border-t border-indigo-100 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <h4 className="mb-3 font-bold text-slate-800">
                        Status
                      </h4>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${statusData.style}`}
                      >
                        <StatusIcon size={15} />
                        {application.status}
                      </span>

                      <div className="mt-4 flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            handleStatusUpdate(application._id, "Accepted")
                          }
                          disabled={!isPending}
                          className="flex items-center gap-1.5 rounded-lg border border-emerald-200  cursor-pointer bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          <Check size={15} />
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(application._id, "Rejected")
                          }
                          disabled={!isPending}
                          className="flex items-center gap-1.5 rounded-lg  cursor-pointer border border-red-200 bg-red-600 px-3 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          <X size={15} />
                          Reject
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default Applicants;