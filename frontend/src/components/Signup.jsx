import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import sitelogo from "../images/Capture.png";

const Signup = () => {
  const [newuser, setnewuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    const api_key = import.meta.env.VITE_SIGNUP_API_KEY;
    try {
      const response = await fetch(api_key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newuser),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
        setnewuser({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error in Registration");
      console.log("Error in catch", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900">
      <div className="bg-stone-800 p-8 rounded-lg shadow-lg w-full max-w-md font-poppins">
        {/* Website Name */}
        <img className="block mx-auto w-24 mb-8" src={sitelogo} alt="logo" />
        {/* Warming Line */}
        <p className="text-center text-stone-300 mb-6">
          Create an account to join our amazing community!
        </p>
        {/* Form */}
        <form onSubmit={handleregister}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-stone-300 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-700 bg-stone-700 text-stone-300"
              placeholder="Enter your username"
              required
              name="username"
              value={newuser.username}
              onChange={(e) =>
                setnewuser({ ...newuser, username: e.target.value })
              }
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-stone-300 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-700 bg-stone-700 text-stone-300"
              placeholder="Enter your email address"
              required
              name="email"
              value={newuser.email}
              onChange={(e) =>
                setnewuser({ ...newuser, email: e.target.value })
              }
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-stone-300 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-700 bg-stone-700 text-stone-300"
              placeholder="Enter your password"
              required
              name="password"
              value={newuser.password}
              onChange={(e) =>
                setnewuser({ ...newuser, password: e.target.value })
              }
            />
          </div>
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-sm text-md font-medium hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {/* Login Link */}
        <p className="text-center text-stone-300 mt-4 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-red-600 font-medium hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
