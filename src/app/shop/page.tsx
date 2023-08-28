import Shop from "@/components/Shop/Shop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop",
};

export default function ShopPage() {
  return (
    <div>
      <Shop />
    </div>
  );
}
