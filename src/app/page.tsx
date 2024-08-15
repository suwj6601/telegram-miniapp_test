"use client";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      console.log("User data", WebApp.initDataUnsafe.user);

      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <>
      {userData ? (
        <div>
          <p>{JSON.stringify(userData)}</p>
          <h1>Hi {userData.first_name}!</h1>
          <p>Your ID is {userData.id}</p>
          <p>Your username is {userData.username}</p>
          <p>Your language code is {userData.language_code}</p>
          <p>Your premium status is {userData.is_premium ? "true" : "false"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
