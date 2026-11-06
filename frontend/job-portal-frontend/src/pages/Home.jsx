
import { useNavigate } from "react-router-dom";
import home from "../assets/home.png";

import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaApple,
  FaFacebook,
  FaSlack
} from "react-icons/fa";

import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#F7F9FE] px-4 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-20">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-5">

        {/* Left Content */}
        <div className="w-full text-center md:w-1/2 md:text-left">

          <section>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Find Your
            </h1>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Dream Job
            </h1>

            <p className="mt-5 text-sm text-gray-700 sm:text-base">
              Search from thousands of job listings ans apply
            </p>

            <p className="text-sm text-gray-700 sm:text-base">
              to the best opportunities around you.
            </p>

            {user?.role === "jobseeker" && (
              <button
                className="mt-5 cursor-pointer rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </button>
            )}
          </section>

        </div>

        {/* Right Image */}
        <div className="flex w-full justify-center md:w-1/2">
          <img
            className="h-auto w-full max-w-[350px] object-contain sm:max-w-[420px] md:max-w-full"
            src={home}
            alt="Find your dream job"
          />
        </div>

      </div>

      {/* Featured Companies */}
      <div className="mt-8 sm:mt-10">

        <h1 className="text-center text-lg font-bold sm:text-xl md:text-left">
          Featured Companies
        </h1>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">

          {/* Google */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaGoogle className="text-2xl text-[#4285F4] sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">Google</span>
          </div>

          {/* Microsoft */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaMicrosoft className="text-2xl text-[#F25022] sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">Microsoft</span>
          </div>

          {/* Amazon */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaAmazon className="text-2xl text-black sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">amazon</span>
          </div>

          {/* Apple */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaApple className="text-2xl text-black sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">Apple</span>
          </div>

          {/* Facebook */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaFacebook className="text-2xl text-[#1877F2] sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">Facebook</span>
          </div>

          {/* Slack */}
          <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:h-24">
            <FaSlack className="text-2xl text-[#611F69] sm:text-3xl" />
            <span className="text-sm font-bold sm:text-lg">Slack</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;
