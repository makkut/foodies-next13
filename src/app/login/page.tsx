"use client";
import Login from "@/components/Login/Login";
import Registration from "@/components/Login/Registration";
import { useCookies, useLogin } from "@/state/state";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { userInfo } = useCookies((state: any) => state);
  const { isAuth } = useLogin((state: any) => state);
  return (
    <>
      {userInfo === null ? (
        <>
          {isAuth ? <Login /> : <Registration />}
          {/* <Registration />
          <Login /> */}
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
}
