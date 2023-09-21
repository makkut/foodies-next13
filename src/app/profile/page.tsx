"use client";
import Profile from "@/components/Login/Profile";
import { useCookies } from "@/state/state";

export default function ProfilePage() {
  const { userInfo } = useCookies((state: any) => state);
  return (
    <>
      <Profile user={userInfo} />
    </>
  );
}
