import { getCategoriesAsync, getGoodsAsync } from "../service/handlers";
import { useQuery } from "@tanstack/react-query";

const useGoods = (category: string, query: string, sort: string) => {
  return useQuery({
    queryKey: ["goods", category, query, sort],
    queryFn: () => getGoodsAsync(category, query, sort),
    staleTime: 5 * 60 * 1000,
  });
};

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAsync(),
    staleTime: 5 * 60 * 1000,
  });
};

export { useGoods, useCategories };
