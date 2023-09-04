import Search from "@/components/Search/Search";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ searchParams }: Props) {
  return { title: `${searchParams.query} | Search`, description: "Search" };
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.query;
  return (
    <>
      <Search query={query} />
    </>
  );
}
