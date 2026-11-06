import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";
import { toast } from "react-toastify";
import job from "../assets/job.svg";
import {
  BriefcaseBusiness,
  CircleCheck,
  GraduationCap,
  IndianRupee,
  MapPin,
  Users,
  FileText,
  ListChecks,
} from "lucide-react";

const CreateJob = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.job);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    workmode: "",
    position: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      requirements: formData.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      jobType: formData.jobType,
    };

    const result = await dispatch(createJob(jobData));

    if (createJob.fulfilled.match(result)) {
      setFormData({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experienceLevel: "",
        jobType: "",
        workmode: "",
        position: "",
        status: "",
      });

      toast.success("Job created successfully");
    }

    if (createJob.rejected.match(result)) {
      toast.error(result.payload || "Failed to create job");
    }
  };

  return (
    <div className="p-3 sm:p-5 flex justify-center items-center min-w-0">
      <div className="bg-white w-full md:w-2/3 p-4 sm:p-6 md:p-10 shadow-lg border border-gray-200 rounded-xl hover:shadow-xl min-w-0">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 bg-[#EDEBFF] rounded-2xl flex justify-center items-center">
            <img className="h-8" src={job} alt="" />
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-xl sm:text-2xl">
              Create New Job
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-500">
              Fill in the details below to post a new job and find the right
              candidate.
            </p>
          </div>
        </div>

        <div className="mt-5 border border-[#EDEBFF]"></div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-5 flex items-center gap-3 sm:gap-5">
            <div className="h-8 w-8 shrink-0 flex justify-center items-center bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full">
              <h1 className="font-extrabold text-indigo-900">1</h1>
            </div>

            <div>
              <h1 className="font-bold">Basic Information</h1>
              <p className="text-xs font-semibold text-gray-500">
                Add the core details about the job position.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 sm:px-4 md:px-12">
              <div className="flex flex-col gap-1 min-w-0">
                <label
                  className="font-bold cursor-pointer text-sm"
                  htmlFor="title"
                >
                  Job Title<span className="text-red-500">*</span>
                </label>

                <input
                  id="title"
                  name="title"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold p-2"
                  placeholder="e.g. Full Stack Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="jobType"
                  >
                    Job Type<span className="text-red-500">*</span>
                  </label>
                </div>

                <select
                  id="jobType"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold text-black/60 p-2"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="workmode"
                  >
                    Workmode<span className="text-red-500">*</span>
                  </label>
                </div>

                <select
                  id="workmode"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold text-black/60 p-2"
                  name="workmode"
                  value={formData.workmode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Work Mode</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <IndianRupee size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="salary"
                  >
                    Salary<span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  id="salary"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold p-2"
                  name="salary"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="experienceLevel"
                  >
                    Experience Level<span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  id="experienceLevel"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold p-2"
                  name="experienceLevel"
                  placeholder="Experience Level"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="position"
                  >
                    Positions<span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  id="position"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold p-2"
                  name="position"
                  placeholder="Number of Positions"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="location"
                  >
                    Location<span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  id="location"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold p-2"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CircleCheck size={18} className="text-slate-500 shrink-0" />
                  <label
                    className="font-bold cursor-pointer text-sm"
                    htmlFor="status"
                  >
                    Status<span className="text-red-500">*</span>
                  </label>
                </div>

                <select
                  id="status"
                  className="w-full border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold text-black/60 p-2"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Job Status
                  </option>
                  <option value="Open">Open</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 sm:gap-5">
            <div className="h-8 w-8 shrink-0 flex justify-center items-center bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full">
              <h1 className="font-extrabold text-indigo-900">2</h1>
            </div>

            <div>
              <h1 className="font-bold text-sm">Job Description</h1>
              <p className="text-xs font-semibold text-gray-400">
                Provide a detailed description of the role and requirements.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <FileText size={18} className="text-slate-500 shrink-0" />
            <label
              className="cursor-pointer font-bold text-sm"
              htmlFor="description"
            >
              Description<span className="text-red-500">*</span>
            </label>
          </div>

          <textarea
            id="description"
            className="w-full mt-1 border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold text-black/60 p-3 sm:p-5 md:p-8"
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="mt-5 flex items-center gap-2">
            <ListChecks size={18} className="text-slate-500 shrink-0" />
            <label
              className="cursor-pointer font-bold text-sm"
              htmlFor="requirements"
            >
              Requirements<span className="text-red-500">*</span>
            </label>
          </div>

          <input
            id="requirements"
            className="w-full mt-1 border-2 border-[#EDEBFF] rounded-lg text-sm font-semibold text-black/60 p-3 sm:p-5 md:p-8"
            name="requirements"
            placeholder="Requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
          />

          <div className="w-full flex justify-end">
            <button
              className="w-full sm:w-auto mt-5 cursor-pointer text-sm font-bold py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Posting Job..." : "Post Job"}
            </button>
          </div>

          {error && (
            <p className="mt-3 p-2 bg-red-100 text-red-600 font-semibold text-sm rounded">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJob;