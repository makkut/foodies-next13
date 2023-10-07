"use client";
// import PlaceOrder from "@/components/PlaceOrder/PlaceOrder";
import { useCookies } from "@/state/state";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

export default function PlaceOrderPage() {
  const { userInfo } = useCookies((state: any) => state);
  console.log("userInfo", userInfo);
  return <>{/* <PlaceOrder /> */}</>;
}
