import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import company from "../assets/company.svg";
import { Building2, Globe, FileText, MapPin, CloudUpload } from "lucide-react";

const RegisterCompany = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");
      setCompanies(response.data.companies || []);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.website.trim() ||
      !formData.location.trim() ||
      !formData.logo
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("website", formData.website);
      data.append("location", formData.location);
      data.append("logo", formData.logo);

      await api.post("/company/register", data);

      toast.success("Company registered successfully");
      navigate("/create-job");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to register company");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-5">Loading companies...</p>;

  return (
    <div
      className="relative min-h-screen m-3 sm:m-5 md:m-10 p-3 sm:p-5 md:p-10 rounded-lg border border-slate-200 shadow-lg bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="bg-cover bg-center bg-no-repeat p-3 sm:p-5 md:p-10 rounded-lg border border-slate-200 flex flex-col items-center gap-5">
        <div className="px-3 py-2 rounded-2xl text-indigo-800 text-sm font-bold flex items-center gap-2 bg-indigo-100">
          <Building2 size={18} />
          <h1>Company Portal</h1>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-bold text-xl sm:text-2xl">
            Your Registered Company
          </h2>
          <h3 className="text-xs text-gray-500 font-semibold">
            Here are the details of your Company. You can now create and post
            job for this company.
          </h3>
        </div>

        {companies.length > 0 ? (
          <div className="w-full bg-sky-50 p-3 sm:p-5 rounded-lg border border-slate-200 shadow-lg hover:shadow-xl flex flex-col gap-5">
            {companies.map((company) => (
              <div key={company._id} className="w-full min-w-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="w-24 h-24 h-fit self-start shrink-0 border border-gray-200 shadow-lg rounded-lg p-2 flex items-center justify-center">
  <img
    className="w-full h-full rounded-lg object-contain"
    src={company.logo}
    alt="Company logo"
  />
</div>

                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="font-bold text-xl sm:text-2xl break-words">
                      {company.name}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5">
                      <div className="flex items-center gap-1 min-w-0">
                        <MapPin
                          size={18}
                          className="text-indigo-700 shrink-0"
                        />
                        <h3 className="font-bold text-indigo-700 text-xs break-words">
                          {company.location}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 min-w-0">
                        <Globe
                          size={18}
                          className="text-indigo-700 shrink-0"
                        />
                        <a
                          className="font-semibold text-xs text-indigo-700 break-all"
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xs  text-gray-600 break-words">
                      {company.description}
                    </h3>
                  </div>
                </div>

                <button
                  className="w-full sm:w-auto mt-5 cursor-pointer text-sm font-medium py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                  onClick={() => navigate("/create-job")}
                >
                  Continue to Create Job
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-10 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="h-14 w-12 shrink-0 bg-[#E6E1FF] rounded-lg flex justify-center items-center">
                  <img className="h-8" src={company} alt="" />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-xl sm:text-2xl">
                    Register Your Company
                  </h2>
                  <h3 className="text-xs font-semibold">
                    Add your company details to start posting jobs and attract
                    top talent.
                  </h3>
                </div>
              </div>

              <form
                className="mt-5 flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Building2 size={18} className="text-slate-500" />
                    <label
                      className="text-sm cursor-pointer font-bold"
                      htmlFor="name"
                    >
                      Company Name<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    className="w-full border border-[#D8D3FF] rounded text-sm p-2"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="w-full sm:w-1/2">
                    <div className="flex items-center gap-1">
                      <Globe size={18} className="text-slate-500" />
                      <label
                        className="text-sm cursor-pointer font-bold"
                        htmlFor="website"
                      >
                        Website<span className="text-red-500">*</span>
                      </label>
                    </div>

                    <input
                      type="text"
                      className="w-full mt-1 border border-[#D8D3FF] rounded text-sm p-2"
                      placeholder="http://www.yourcompany.com"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <div className="flex items-center gap-1">
                      <MapPin size={18} className="text-slate-500" />
                      <label
                        className="text-sm cursor-pointer font-bold"
                        htmlFor="location"
                      >
                        Location<span className="text-red-500">*</span>
                      </label>
                    </div>

                    <input
                      className="w-full mt-1 border border-[#D8D3FF] rounded text-sm p-2"
                      id="location"
                      placeholder="e.g. Bangalore, India"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <FileText size={18} className="text-slate-500" />
                    <label
                      className="text-sm cursor-pointer font-bold"
                      htmlFor="description"
                    >
                      Description<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <textarea
                    className="w-full mt-1 border border-[#D8D3FF] rounded text-sm p-3 sm:p-6"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm cursor-pointer font-bold"
                    htmlFor="logo"
                  >
                    Company Logo <span className="text-red-500">*</span>
                  </label>

                  <label
                    htmlFor="logo"
                    className="flex min-h-[132px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 transition-all duration-300 hover:border-violet-500 hover:bg-violet-500/5 p-3 text-center"
                  >
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          logo: e.target.files?.[0] || null,
                        }))
                      }
                    />

                    <CloudUpload size={38} className="mb-3 text-violet-500" />

                    <p className="text-sm font-medium break-all">
                      {formData.logo
                        ? formData.logo.name
                        : "Click to upload or drag and drop"}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      PNG, JPG, JPEG, WEBP (Max 2MB)
                    </p>
                  </label>
                </div>

                <button
                  className="w-full mt-2 cursor-pointer text-sm font-bold py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-300 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Register Company"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterCompany;