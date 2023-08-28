import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";
import Search from "./Search/Search";
import { getCategoriesAsync, getGoodsAsync } from "@/service/handlers";

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["goods"], () => getGoodsAsync);
  await queryClient.prefetchQuery(["categories"], () => getCategoriesAsync);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Search />
    </Hydrate>
  );
}
