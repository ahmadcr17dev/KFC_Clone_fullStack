import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import sitelogo from "../images/sitelogo.png";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const api_key = import.meta.env.VITE_LOGIN_API_KEY;

    if (!api_key) {
      toast.error("API key is not configured.");
      return;
    }

    try {
      const response = await fetch(api_key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        toast.error("Failed to connect to the server.");
        return;
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate based on user type
        if (data.user_type === "admin") {
          navigate("/admin");
        } else if (data.user_type === "user") {
          navigate("/");
        }

        // Reset form
        setUser({
          username: "",
          password: "",
        });
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900">
      <div className="bg-stone-800 rounded-lg shadow-lg p-8 w-full max-w-md font-poppins">
        <img src={sitelogo} alt="logo" className="block mx-auto w-56 mb-8" />
        <p className="text-center text-stone-300 mb-6">
          Welcome back! Please log in to continue.
        </p>

        <form onSubmit={handleLogin}>
          {/* Username Input */}
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
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-stone-300 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-700 bg-stone-700 text-stone-300"
              placeholder="Enter your password"
              required
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-sm text-sm font-medium hover:bg-red-800 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-stone-300 mt-4 text-sm">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-red-600 font-medium hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;