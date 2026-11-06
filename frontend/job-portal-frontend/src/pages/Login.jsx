
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, getProfile, clearError } from '../redux/slices/authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    email: "",
    password: "",
  })

  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })

    if (error) {
      dispatch(clearError())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser(formData)).unwrap()
      await dispatch(getProfile()).unwrap()

      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-3 py-6 sm:px-5">

      <div className="w-full max-w-md p-4 sm:p-6 flex flex-col gap-3 border bg-white rounded-xl shadow-lg border-gray-200 hover:shadow-xl transition-shadow">

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Login</h1>

          <div>
            <p className="font-semibold text-xs opacity-90">
              Welcome Back!
            </p>

            <p className="text-sm font-semibold text-gray-500">
              Login to your account
            </p>
          </div>
        </div>

        {error && (
          <p className="bg-amber-100 text-amber-800 p-2 rounded-lg text-sm break-words">
            {error}
          </p>
        )}

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <label
            className="font-semibold cursor-pointer"
            htmlFor="email"
          >
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

          <label
            className="font-semibold cursor-pointer"
            htmlFor="password"
          >
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

          <button
            className="cursor-pointer w-full text-sm font-bold mt-2 py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-100 transition-all duration-300 hover:bg-none hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-2 font-semibold text-gray-800 text-sm">
          Don't have an account?{" "}
          <button
            className="text-indigo-900 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login

