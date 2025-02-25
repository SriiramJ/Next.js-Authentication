"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Login failed", error.message);
      } else {
        console.log("Login failed", error);
      }
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email: forgotEmail });
      toast.success("Password reset email sent");
      setShowModal(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="mb-4" />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 w-full text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 w-full text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onLogin}
          className={`p-2 rounded-lg mb-4 w-full text-white ${
            buttonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none`}
          disabled={buttonDisabled}
        >
          {loading ? "Processing..." : "Login"}
        </button>
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 w-full text-black"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button
              onClick={handleForgotPassword}
              className={`p-2 rounded-lg mb-4 w-full text-white ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Send Reset Email"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 rounded-lg mb-4 w-full text-white bg-red-500 hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
