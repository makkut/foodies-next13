import Categories from "@/components/Categories/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories",
};

export default function CategoriesPage() {
  return (
    <>
      <Categories />
    </>
  );
}
