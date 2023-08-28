import Search from "@/components/Search/Search";

export function generateMetadata({ searchParams }: any) {
  return { title: `${searchParams.query} | Search`, description: "Search" };
}

export default function SearchPage({ searchParams }: any) {
  const query = searchParams.query;
  return (
    <>
      <Search query={query} />
    </>
  );
}
