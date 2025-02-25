"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      const err = error as AxiosError;
      setError(true);
      console.log(err.response?.data);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black rounded-lg mb-4">
          {token ? `${token}` : "No token"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl text-green-500 mb-4">Email Verified</h2>
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-black rounded-lg p-2 mb-4">
              Error
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
