// import Shop from "@/components/Shop/Shop";
"use client";
import CheckoutWizard from "@/components/CheckoutWizard/CheckoutWizard";
import Shipping from "@/components/Shipping/Shipping";
import { useCookies } from "@/state/state";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

export default function ShippingPage() {
  const { userInfo } = useCookies((state: any) => state);
  console.log("userInfo", userInfo);
  return (
    <>
      {/* <Shipping /> */}
      {userInfo === null ? redirect("/login") : <Shipping />}

      {/* <div>
        // <CheckoutWizard activeStep={1}></CheckoutWizard>
        // Shipping Address //{" "}
      </div> */}
    </>
  );
}
