
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecruiterStats,
  getJobseekerStats,
  getRecentApplications,
  getRecruiterApplications
} from "../redux/slices/dashboardSlice";

import {
  BriefcaseBusiness,
  Eye,
  FolderClosed,
  Clock,
  LoaderCircle,
  MapPin,
  CalendarDays,
  Users,
  Mail,
  Phone
} from "lucide-react";

import { getTimeAgo } from "../components/Timer";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    stats,
    recentApplications,
    recruiterApplications,
    loading,
    error
  } = useSelector((state) => state.dashboard);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "recruiter") {
      dispatch(getRecruiterStats());
      dispatch(getRecruiterApplications());
    }

    if (user?.role === "jobseeker") {
      dispatch(getJobseekerStats());
      dispatch(getRecentApplications());
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  if (error) {
    return <p className="p-4">{error}</p>;
  }

  if (user?.role === "jobseeker") {
    return (
      <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 md:p-8 lg:p-10">

        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Welcome, {user.fullName}
          </h1>

          <h3 className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
            Here's what's happening with your job activity today.
          </h3>
        </div>

        {stats && (
          <div className="grid grid-cols-1 gap-3 min-[375px]:grid-cols-2 lg:grid-cols-4">

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-300 bg-indigo-200">
                <BriefcaseBusiness size={22} className="font-bold text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Total Applications
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.totalApplications}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-300 bg-green-200">
                <Eye size={22} className="text-green-700" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Accepted Applications
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.acceptedApplications}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-300 bg-yellow-200">
                <Clock size={22} className="text-yellow-700" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Pending Applications
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.pendingApplications}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-300 bg-red-200">
                <FolderClosed size={22} className="font-bold text-red-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Rejected Applications
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.rejectedApplications}
                </h3>
              </div>
            </div>

          </div>
        )}

        <h2 className="font-bold">Recent Applications</h2>

        {recentApplications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          recentApplications.map((application) => (
            <div
              key={application._id}
              className="flex flex-col gap-4 rounded-lg border border-gray-300 p-3 sm:flex-row sm:items-center sm:justify-between"
            >

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-gray-200">
                  {application.job?.company?.logo ? (
                    <img
                      className="h-10 w-10 rounded-lg object-fill"
                      src={application.job.company.logo}
                      alt="logo"
                    />
                  ) : (
                    <BriefcaseBusiness size={22} className="text-gray-400" />
                  )}
                </div>

                <div className="flex min-w-0 flex-col gap-1">

                  <h2 className="break-words text-sm font-semibold">
                    {application.job?.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-1">
                    <BriefcaseBusiness size={10} className="shrink-0 text-gray-400" />

                    <p className="text-xs font-semibold text-gray-400">
                      {application.job?.company?.name}
                    </p>

                    <MapPin size={10} className="shrink-0 text-gray-400" />

                    <p className="text-xs font-semibold text-gray-400">
                      {application.job?.location}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-2">
                    <p className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                      {application.job?.jobType}
                    </p>

                    <p className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                      {application.job?.workmode}
                    </p>
                  </div>

                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-col sm:items-end">

                <p
                  className={
                    application.status === "Accepted"
                      ? "rounded-lg border border-green-300 bg-green-100 px-4 py-1 text-xs font-medium text-green-600"
                      : application.status === "Pending"
                      ? "rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-1 text-xs font-medium text-yellow-700"
                      : "rounded-lg border border-red-300 bg-red-100 px-4 py-1 text-xs font-medium text-red-600"
                  }
                >
                  {application.status}
                </p>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="shrink-0 text-indigo-500" />
                  <p className="text-xs font-semibold text-gray-400">
                    Applied {getTimeAgo(application.createdAt)}
                  </p>
                </div>

              </div>

            </div>
          ))
        )}

      </div>
    );
  }

  if (user?.role === "recruiter") {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 md:p-8 lg:gap-10 lg:p-10">

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome, {user.fullName}
          </h1>

          <h3 className="mt-1 text-xs text-gray-500 sm:text-sm">
            Here's an overview of your hiring activities.
          </h3>
        </div>

        {stats && (
          <div className="grid grid-cols-1 gap-3 min-[375px]:grid-cols-2 lg:grid-cols-4">

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-300 bg-indigo-200">
                <BriefcaseBusiness size={22} className="font-bold text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Total Jobs
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.totalJobs}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-purple-300 bg-purple-100 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-300 bg-purple-200">
                <Users size={22} className="font-bold text-purple-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Total Applicants
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.totalApplicants}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-300 bg-green-200">
                <Eye size={22} className="text-green-700" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Accepted Applicants
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.acceptedApplicants}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-3 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-300 bg-yellow-200">
                <Clock size={22} className="text-yellow-700" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Pending Applicants
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.pendingApplicants}
                </h3>
              </div>
            </div>

            <div className="flex min-h-20 items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-3 sm:gap-3 lg:col-span-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-300 bg-red-200">
                <FolderClosed size={22} className="font-bold text-red-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-gray-600">
                  Rejected Applicants
                </h2>
                <h3 className="text-xl font-semibold">
                  {stats.rejectedApplicants}
                </h3>
              </div>
            </div>

          </div>
        )}

        <div className="flex flex-col gap-5">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500 sm:h-12 sm:w-12">
              <Users className="text-white" size={26} />
            </div>

            <div>
              <h2 className="font-bold">Recent Applications</h2>
              <h4 className="text-xs font-semibold text-gray-600">
                Latest applications for your job.
              </h4>
            </div>
          </div>

          {recruiterApplications.length === 0 ? (
            <p className="text-sm">No recent application.</p>
          ) : (
            recruiterApplications.map((application) => (
              <div
                key={application._id}
                className="flex flex-col gap-4 border-b border-indigo-200 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between"
              >

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                  {application.applicant.profile?.profilePhoto ? (
                    <img
                      className="h-14 w-14 shrink-0 rounded-full object-fill sm:h-16 sm:w-16"
                      src={application.applicant.profile.profilePhoto}
                      alt=""
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 sm:h-16 sm:w-16">
                      {application.applicant.fullName?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h1 className="truncate font-bold">
                      {application.applicant.fullName}
                    </h1>

                    <div className="mt-1 flex items-center gap-1">
                      <Mail size={14} className="shrink-0 text-gray-600" />
                      <h2 className="break-all text-xs font-semibold text-gray-600 sm:text-sm">
                        {application.applicant.email}
                      </h2>
                    </div>

                    <div className="mt-1 flex items-center gap-1">
                      <Phone size={14} className="shrink-0 text-gray-600" />
                      <h2 className="text-xs font-semibold text-gray-600 sm:text-sm">
                        {application.applicant.phone}
                      </h2>
                    </div>
                  </div>

                </div>

                <div className="hidden h-16 border-l border-indigo-100 lg:block"></div>

                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-400 sm:h-12 sm:w-12">
                    <BriefcaseBusiness size={26} className="text-white" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="break-words font-bold">
                      {application.job.title}
                    </h1>
                    <h2 className="text-sm font-semibold text-gray-600">
                      {application.job.location}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end lg:gap-5">

                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="shrink-0 text-indigo-500" />
                    <p className="text-xs font-semibold text-gray-400">
                      Applied {getTimeAgo(application.createdAt)}
                    </p>
                  </div>

                  <p
                    className={
                      application.status === "Accepted"
                        ? "rounded-lg border border-green-300 bg-green-100 px-4 py-1 text-xs font-medium text-green-600"
                        : application.status === "Pending"
                        ? "rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-1 text-xs font-medium text-yellow-700"
                        : "rounded-lg border border-red-300 bg-red-100 px-4 py-1 text-xs font-medium text-red-600"
                    }
                  >
                    {application.status}
                  </p>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    );
  }

  return <p className="p-5">Unauthorized</p>;
};

export default Dashboard;
