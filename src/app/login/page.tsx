"use client"; // Ensure this is at the top

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const mockUsers = [
  { username: "manager", password: "manager123", role: "manager" },
  { username: "employee", password: "employee123", role: "employee" },
];

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push("/"); // Redirect to the main page after successful login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-xl p-4 gap-8">
        {/* Left: Login form */}
        <div className="flex flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-auto w-auto"
              src="/StockFlow.png"
              alt="Your Company"
            />
            {/* <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to <span className="text-indigo-700">StockFlow</span>
            </h2> */}
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-2xl border-gray-300 shadow-lg shadow-purple-700/3 focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xl px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-2xl border-gray-300 shadow-lg shadow-purple-500/3 focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xl px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex items-center justify-center">
          <img
            src="/inventorymanagement.png"
            alt="Inventory Management"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
