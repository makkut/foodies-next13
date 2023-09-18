"use client";
import Login from "@/components/Login/Login";
import Profile from "@/components/Login/Profile";
import Registration from "@/components/Login/Registration";
import { useCookies } from "@/state/state";

export default function LoginPage() {
  const { userInfo } = useCookies((state: any) => state);
  return (
    <>
      {userInfo === null ? (
        <>
          <Registration />
          <Login />
        </>
      ) : (
        <Profile />
      )}
    </>
  );
}
