// import { dehydrate, Hydrate } from "@tanstack/react-query";
// import getQueryClient from "./getQueryClient";
// import { getCategoriesAsync, getGoodsAsync } from "@/service/handlers";
// import Search from "./Search/Search";
// import Shop from "./Shop/Shop";

// export default async function HydratedPosts() {
//   const queryClient = getQueryClient();
//   await queryClient.prefetchQuery(["goods"], () => getGoodsAsync);
//   await queryClient.prefetchQuery(["categories"], () => getCategoriesAsync);
//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <Hydrate state={dehydratedState}>
//       <Shop />
//       <Search />
//     </Hydrate>
//   );
// }
