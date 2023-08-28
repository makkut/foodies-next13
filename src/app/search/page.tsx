import Search from "@/components/Search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search",
};

export default function SearchPage({ searchParams }: any) {
  const query = searchParams.query;
  return (
    <>
      <Search query={query} />
    </>
  );
}

export async function getStaticProps(context: any) {
  const query = context.query;

  return {
    props: { query },
  };
}
