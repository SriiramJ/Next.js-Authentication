"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams();
  const { id } = params;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setUserId(id as string);
    }
  }, [id]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {userId}
        </span>
      </p>
    </div>
  );
}
