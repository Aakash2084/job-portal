

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, clearError } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "jobseeker",
  })

  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(signupUser(formData))

    if (signupUser.fulfilled.match(result)) {
      navigate('/login')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    if (error) {
      dispatch(clearError())
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-3 py-6 sm:px-5">
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Sign Up</h1>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm opacity-90">Create your account</p>
            <p className="text-xs font-bold text-gray-500">
              Join thousands of job seekers
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-2 mt-5"
          onSubmit={handleSubmit}
        >
          <label className="font-semibold cursor-pointer" htmlFor="fullName">
            Full Name
          </label>

          <input
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label className="font-semibold cursor-pointer" htmlFor="email">
            Email
          </label>

          <input
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="font-semibold cursor-pointer" htmlFor="password">
            Password
          </label>

          <input
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="font-semibold cursor-pointer" htmlFor="phone">
            Phone
          </label>

          <input
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label className="font-semibold cursor-pointer" htmlFor="role">
            Role
          </label>

          <select
            className="w-full sm:w-1/2 border border-gray-300 cursor-pointer rounded-lg font-semibold px-3 py-2 outline-none focus:border-indigo-500"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button
            className="cursor-pointer w-full text-sm font-bold mt-2 py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-100 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2 break-words">
            {error}
          </p>
        )}

        <p className="text-center mt-3 font-semibold text-sm">
          Already have an account?
          <button
            className="text-indigo-600 px-1 font-semibold cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>

      </div>
    </div>
  )
}

export default Signup

