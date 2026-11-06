
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  Camera,
  Mail,
  MapPin,
  Pencil,
  User,
  Save,
  Image,
  Building2,
  Globe,
  Link,
  Phone,
  BriefcaseBusiness,
  Info,
  UploadCloud,
  ExternalLink
} from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [company, setCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    bio: "",
    skills: ""
  });

  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);

  // Selected profile photo preview
  useEffect(() => {
    if (!profilePhoto) {
      setPhotoPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(profilePhoto);
    setPhotoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePhoto]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || ""
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.role !== "recruiter") return;

    const fetchCompany = async () => {
      try {
        setCompanyLoading(true);

        const response = await api.get("/company");
        const companies = response.data.companies || [];

        setCompany(
          companies.find(
            (item) =>
              item._id === user.profile?.company?._id ||
              item._id === user.profile?.company
          ) || companies[0] || null
        );
      } catch (error) {
        toast.error(
          error.response?.data?.msg || "Failed to load company"
        );
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompany();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData = {
        fullName: formData.fullName,
        phone: formData.phone,
        location: formData.location
      };

      if (user?.role === "jobseeker") {
        profileData.bio = formData.bio;
        profileData.skills = formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }

      await api.put("/user/profile", profileData);
      await dispatch(getProfile());

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async () => {
    if (!profilePhoto || photoLoading) return;

    const data = new FormData();
    data.append("profilePhoto", profilePhoto);

    try {
      setPhotoLoading(true);

      await api.put("/user/profile-photo", data);
      await dispatch(getProfile());

      toast.success("Profile photo updated successfully");
      setProfilePhoto(null);
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
          "Failed to upload profile photo"
      );
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-5 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Profile Information</h1>
        <h3 className="font-semibold text-xs text-gray-500">
          Manage your personal information and professional details.
        </h3>
      </div>

      <div className="p-4 sm:p-5 border border-indigo-200 bg-indigo-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col min-[420px]:flex-row items-start min-[420px]:items-center gap-4 sm:gap-6 md:gap-10 w-full min-w-0">

          {(photoPreview || user?.profile?.profilePhoto) && (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                className="w-full h-full rounded-full object-cover object-center"
                src={photoPreview || user.profile.profilePhoto}
                alt="Profile"
              />

              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
              >
                <Camera size={20} />
              </label>
            </div>
          )}

          <input
            id="profile"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setProfilePhoto(file);
              }

              e.target.value = "";
            }}
          />

          <div className="flex flex-col gap-2 min-w-0 w-full">
            <h1 className="font-semibold text-xl break-words">
              {user?.fullName}
            </h1>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Mail size={14} className="text-gray-500 shrink-0" />
                <h1 className="text-sm text-gray-600 font-semibold break-all">
                  {user?.email}
                </h1>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <Phone size={14} className="text-gray-500 shrink-0" />
                <h1 className="text-sm text-gray-600 font-semibold">
                  {user?.phone}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-500 shrink-0" />
              <h1 className="text-sm text-gray-600 font-semibold break-words">
                {user?.location || "Location not added"}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-[420px]:flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0">
          <label
            className="cursor-pointer text-sm flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg text-indigo-700 border-2 border-indigo-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-500 hover:text-white w-full"
            htmlFor="profile"
          >
            <Pencil size={18} />
            Change photo
          </label>

          <button
            className="cursor-pointer text-sm py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-2 border-indigo-400 transition-all duration-300 hover:from-indigo-700 hover:to-violet-800 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-violet-600 w-full"
            type="button"
            onClick={handlePhotoUpload}
            disabled={!profilePhoto || photoLoading}
          >
            <Image size={18} />
            {photoLoading ? "Saving..." : "Save Photo"}
          </button>
        </div>
      </div>

      <form
        className="w-full flex flex-col md:flex-row gap-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full md:w-1/2 flex">
          <div className="rounded-lg w-full p-4 sm:p-5 h-fit border-2 border-indigo-200 flex flex-col gap-5">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="h-12 w-12 shrink-0 bg-indigo-200 rounded-full flex justify-center items-center">
                <User className="text-indigo-800" />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-xl">Personal Details</h2>
                <h3 className="font-semibold text-sm text-gray-600">
                  Update your personal information here.
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm" htmlFor="fullName">
                FullName<span className="font-bold text-red-500">*</span>
              </label>
              <input
                className="border-2 border-indigo-200 rounded-lg text-sm font-semibold p-2 w-full min-w-0"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm" htmlFor="phone">
                Phone<span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="phone"
                className="border-2 border-indigo-200 rounded-lg text-sm font-semibold p-2 w-full min-w-0"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm" htmlFor="location">
                Location<span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="location"
                className="border-2 border-indigo-200 rounded-lg text-sm font-semibold p-2 w-full min-w-0"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <button
              className="cursor-pointer text-sm font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              <Save size={18} />
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>

        {user?.role === "jobseeker" && (
          <div className="rounded-lg p-4 sm:p-5 w-full md:w-1/2 border-2 border-indigo-200 flex flex-col gap-5 min-w-0">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="h-12 w-12 shrink-0 bg-indigo-200 rounded-full flex justify-center items-center">
                <BriefcaseBusiness className="text-indigo-800" />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-xl">Career Profile</h2>
                <h3 className="font-semibold text-sm text-gray-600">
                  Tell us about yourself and showcase your skills.
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                className="border-2 border-indigo-200 rounded-lg text-sm font-semibold p-4 w-full min-w-0"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm" htmlFor="skills">
                Skills
              </label>
              <input
                className="border-2 border-indigo-200 rounded-lg text-sm font-semibold p-2 w-full min-w-0"
                id="skills"
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <div className="h-12 w-12 shrink-0 bg-indigo-200 rounded-full flex justify-center items-center">
                <Save className="text-indigo-800" />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-xl">Resume</h2>
                <h3 className="font-semibold text-sm text-gray-600">
                  Upload your latest resume (PDF,DOC,DOCX).
                </h3>
              </div>
            </div>

            <div className="bg-indigo-200 p-2 flex flex-wrap items-center gap-2 rounded">
              <div className="flex items-center gap-2">
                <Info size={18} className="text-indigo-700 shrink-0" />
                <label className="font-bold text-sm" htmlFor="currentResume">
                  Current resume:
                </label>
              </div>

              {user?.profile?.resume && (
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 min-w-0">
                  <a
                    className="break-all"
                    href={user.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.profile.resumeOriginalName
                      ?.toLowerCase()
                      .endsWith(".pdf")
                      ? "View Resume"
                      : "Download Resume"}
                  </a>
                  <ExternalLink size={15} className="shrink-0" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <label
                htmlFor="resume"
                className="flex-1 min-w-0 cursor-pointer border-2 border-dashed border-indigo-300 bg-indigo-50 rounded-lg p-3 flex items-center gap-3 hover:bg-indigo-100 transition"
              >
                <UploadCloud size={22} className="text-indigo-600 shrink-0" />

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-800 break-all">
                    {resume ? resume.name : "Choose Resume"}
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF, DOC, DOCX
                  </span>
                </div>
              </label>

              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button
                className="cursor-pointer text-sm font-bold py-3 px-5 rounded-lg flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:from-indigo-500 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                type="button"
                disabled={!resume}
                onClick={async () => {
                  if (!resume) return;

                  const data = new FormData();
                  data.append("resume", resume);

                  try {
                    await api.put("/user/resume", data);
                    await dispatch(getProfile());

                    toast.success("Resume uploaded successfully");
                    setResume(null);
                  } catch (error) {
                    toast.error(
                      error.response?.data?.msg ||
                        "Failed to upload resume"
                    );
                  }
                }}
              >
                <UploadCloud size={18} />
                Upload Resume
              </button>
            </div>
          </div>
        )}

        {user?.role === "recruiter" && (
          <div className="rounded-lg p-4 sm:p-5 border-2 border-indigo-200 w-full md:w-1/2 flex flex-col gap-5 min-w-0">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="h-12 w-12 shrink-0 bg-indigo-200 rounded-full flex justify-center items-center">
                <Building2 className="text-indigo-800" />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-xl">Company Details</h2>
                <h3 className="font-semibold text-sm text-gray-600">
                  Information about your company.
                </h3>
              </div>
            </div>

            {companyLoading ? (
              <p>Loading company details...</p>
            ) : company ? (
              <div className="flex flex-col gap-2 min-w-0">
                <div className="p-3 sm:p-5 bg-indigo-100 w-full min-h-24 rounded-lg flex flex-col min-[420px]:flex-row justify-between items-start min-[420px]:items-center gap-3">
                  <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                    <div className="h-16 w-16 shrink-0 border border-gray-200 bg-white rounded-lg flex justify-center items-center overflow-hidden">
                      {company.logo && (
                        <img
                          className="w-full h-full object-fill"
                          src={company.logo}
                          alt={company.name}
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h1 className="font-bold break-words">
                        {company.name}
                      </h1>
                      <h3 className="font-semibold text-xs text-gray-600">
                        Registered Company
                      </h3>
                    </div>
                  </div>

                  <div className="bg-white px-2 py-1 border border-gray-200 rounded-xl font-semibold text-sm flex items-center gap-2 shrink-0">
                    <div className="p-1 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </div>
                </div>

                <div className="rounded-lg p-3 border border-indigo-200 bg-indigo-50 w-full flex flex-col min-[420px]:flex-row justify-between min-[420px]:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 bg-indigo-200 flex justify-center items-center rounded-xl">
                      <MapPin size={16} className="text-indigo-700" />
                    </div>
                    <p className="text-sm font-semibold opacity-90">
                      Location
                    </p>
                  </div>

                  <p className="font-semibold text-xs opacity-70 break-words min-[420px]:text-right">
                    {company.location || "Not added"}
                  </p>
                </div>

                <div className="rounded-lg p-3 border border-indigo-200 bg-indigo-50 w-full flex flex-col min-[420px]:flex-row justify-between min-[420px]:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 bg-indigo-200 flex justify-center items-center rounded-xl">
                      <Globe size={16} className="text-indigo-700" />
                    </div>
                    <p className="text-sm font-semibold opacity-90">
                      Website
                    </p>
                  </div>

                  <div className="font-semibold text-xs opacity-70 flex items-center gap-1 min-w-0 min-[420px]:justify-end">
                    {company.website ? (
                      <a
                        className="break-all"
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "Not added"
                    )}
                    <Link
                      size={16}
                      className="text-indigo-700 shrink-0"
                    />
                  </div>
                </div>

                <button
                  className="cursor-pointer mt-2 text-sm font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-400 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                  type="button"
                  onClick={() => navigate("/register-company")}
                >
                  <Building2 size={18} />
                  Manage Company
                </button>
              </div>
            ) : (
              <div>
                <p>You have not registered a company yet.</p>

                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => navigate("/register-company")}
                >
                  Register Company
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
