import {
  getCategoriesAsync,
  getGoodAsync,
  getGoodsAsync,
  getUser,
  lengthGoodsAsync,
} from "../service/handlers";
import { useQuery } from "@tanstack/react-query";

const useGoods = (
  page: number,
  itemsPerPage: number,
  category: string,
  query: string,
  sort: string
) => {
  return useQuery({
    queryKey: ["goods", page, itemsPerPage, category, query, sort],
    queryFn: () => getGoodsAsync(page, itemsPerPage, category, query, sort),
    staleTime: 5 * 60 * 1000,
  });
};

const useGood = (id: string) => {
  return useQuery({
    queryKey: ["good", id],
    queryFn: () => getGoodAsync(id),
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
const useGoodsLength = (category: string) => {
  return useQuery({
    queryKey: ["goodsLength", category],
    queryFn: () => lengthGoodsAsync(category),
    staleTime: 5 * 60 * 1000,
  });
};

const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    staleTime: 5 * 60 * 1000,
  });
};

export { useGoods, useGood, useCategories, useGoodsLength, useUser };
