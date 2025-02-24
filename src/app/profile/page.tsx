"use client"
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login");
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
       const res = await axios.get("/api/users/me")
       console.log(res.data);
       setData(res.data.data._id)
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
          <h2 className="p-2 mt-2 rounded bg-green-500 text-white">
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>
          <hr className="my-4" />
          <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Get User Details
          </button>
        </div>
      </div>
    );    
}