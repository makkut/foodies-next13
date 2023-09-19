"use client";
import Login from "@/components/Login/Login";
import Profile from "@/components/Login/Profile";
import Registration from "@/components/Login/Registration";
import { useCookies } from "@/state/state";

export default function LoginPage() {
  const { userInfo } = useCookies((state: any) => state);
  const user = JSON.parse(userInfo);

  return (
    <>
      {user === null ? (
        <>
          <Registration />
          <Login />
        </>
      ) : (
        <Profile />
        // router.push("/")
      )}
    </>
  );
}
