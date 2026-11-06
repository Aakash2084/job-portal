
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/logo.png";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaThLarge,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaPlus,
  FaSignOutAlt,
  FaFileAlt,
  FaChevronRight,
} from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    await dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    ...(isAuthenticated
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: FaThLarge,
          },
          {
            name: "Profile",
            path: "/profile",
            icon: FaUser,
          },
          ...(user?.role === "jobseeker"
            ? [
                {
                  name: "My Applications",
                  path: "/my-applications",
                  icon: FaFileAlt,
                },
              ]
            : []),
          ...(user?.role === "recruiter"
            ? [
                {
                  name: "Company",
                  path: "/register-company",
                  icon: FaBuilding,
                },
                {
                  name: "My Jobs",
                  path: "/my-jobs",
                  icon: FaBriefcase,
                },
                {
                  name: "Create Job",
                  path: "/create-job",
                  icon: FaPlus,
                },
              ]
            : []),
        ]
      : []),
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const active = location.pathname === item.path;

    return (
      <button
        onClick={() => handleNavigate(item.path)}
        className={`flex items-center cursor-pointer gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
          active
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
        }`}
      >
        <Icon size={15} />
        {item.name}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-indigo-100/80 bg-white/95 shadow-[0_4px_20px_rgba(79,70,229,0.06)] backdrop-blur-xl">

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div
          onClick={() => handleNavigate("/")}
          className="flex shrink-0 cursor-pointer items-center gap-2.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
            <img
              src={logo}
              alt="JobPortal Logo"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl">
              Job<span className="text-indigo-600">Portal</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-[2px] text-slate-400">
              CAREER STARTS HERE
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">

          {isAuthenticated ? (
            <>
              <div className="mr-2 flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 py-1.5 pl-2 pr-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-28">
                  <p className="truncate text-xs font-bold text-slate-800">
                    {user?.fullName}
                  </p>
                  <p className="text-[10px] capitalize text-indigo-500">
                    {user?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2  cursor-pointer rounded-xl border border-rose-100 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-all duration-300 hover:border-rose-500 hover:bg-rose-50"
              >
                <FaSignOutAlt size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigate("/login")}
                className="rounded-xl px-5 py-2.5 text-sm font-bold  cursor-pointer text-slate-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Login
              </button>

              <button
                onClick={() => handleNavigate("/signup")}
                className="flex items-center  cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300"
              >
                Get Started
                <FaChevronRight size={11} />
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center  cursor-pointer justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700 transition-all hover:bg-indigo-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-indigo-100 bg-white transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[650px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-4 sm:px-6">

          {isAuthenticated && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold text-slate-800">
                  {user?.fullName}
                </p>
                <p className="text-xs capitalize text-indigo-600">
                  {user?.role}
                </p>
              </div>
            </div>
          )}

          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl  cursor-pointer px-4 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <Icon size={17} />
                {item.name}
                <FaChevronRight className="ml-auto text-xs opacity-50" />
              </button>
            );
          })}

          <div className="flex gap-3 border-t border-slate-100 pt-4">

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2  cursor-pointer rounded-xl bg-rose-50 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-100"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigate("/login")}
                  className="w-1/2 rounded-xl border border-indigo-200  cursor-pointer py-3 text-sm font-bold text-indigo-700 transition-all hover:bg-indigo-50"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigate("/signup")}
                  className="w-1/2  cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200"
                >
                  Get Started
                </button>
              </>
            )}

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
