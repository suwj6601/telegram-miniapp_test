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
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const getUserAvatar = async (userId: number) => {
    const response = await fetch(`http://localhost:3001/user-avatar/${userId}`);

    const data = await response.json();
    setUserAvatar(data.userAvatarUrl);
  };

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      // Get user avatar
      setUserData(WebApp.initDataUnsafe.user as UserData);
      getUserAvatar((WebApp.initDataUnsafe.user as UserData).id);
    }
  }, []);

  return (
    <>
      {userData ? (
        <div>
          <h1>Hi {userData.first_name}!</h1>

          <div style={{ display: "flex" }}>
            <span>User avatar:</span>
            {userAvatar && (
              <img
                src={
                  "https://api.telegram.org/file/bot6296103442:AAHAAQM4Kwu_uv-lqMntXLypk2uGToMDjDY/photos/file_1.jpg"
                }
                alt="User avatar"
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              />
            )}
          </div>

          <p>Your ID is {userData.id}</p>
          <p>Your username is {userData.username}</p>
        </div>
      ) : (
        <>
          <p>Loading..</p>
        </>
      )}
    </>
  );
}
