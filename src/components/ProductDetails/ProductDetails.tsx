"use client";
import { useGood } from "@/hook/useCustomQuery";
import { useCart, useFavorites } from "@/state/state";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import ErrorData from "../Error/ErrorData";
import Spinner from "../Spinner/Spinner";

export default function ProductDetails({ id }: any) {
  const { data, isLoading, isError } = useGood(id);
  console.log("good", data);
  const [count, setCount] = useState(1);
  const { toggleFavorites, favorites } = useFavorites();
  const { addToCart } = useCart();
  //   const { addToCart, toogleFavorites } = useActions();
  //   const isFavorites = useSelector((state: any) => state.favorites.favorites);
  //   const { name, image, longDescription, category, price } = item.attributes;
  //   const API_URL = process.env.API_URL;
  //   console.log("isFavorites", isFavorites);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <ErrorData />
      </div>
    );

  return (
    <div className="flex justify-center items-center pt-5 mb-10">
      <Box position="relative">
        <Image
          className=""
          alt={data[0].name}
          width={300}
          height={534}
          src={data[0].imageUrl}
        />
        <Box className="absolute top-[5%] left-[77%] px-[5%] py-0">
          {favorites.find((i: any) => i.id === data[0].id) ? (
            <button onClick={() => toggleFavorites({ item: { ...data[0] } })}>
              <MdFavorite color="white" size={32} />
            </button>
          ) : (
            <button onClick={() => toggleFavorites({ item: { ...data[0] } })}>
              <MdFavoriteBorder color="white" size={32} />
            </button>
          )}
        </Box>
      </Box>
      <div className="w-[50%] pl-6">
        <h3 className="font-bold text-lg">{data[0].name}</h3>

        <Box className="mt-[3px]">
          <Typography variant="subtitle2">
            {data[0].category
              .replace(/([A-Z])/g, " $1")
              .replace(/^ ./, (str: any) => str.toUpperCase())}
          </Typography>
          <p className="font-bold text-base pt-4">{data[0].price} $</p>
        </Box>
        <Box
          className="flex items-center 
            rounded-[3px] bg-white"
        >
          <div className="flex items-center border-[1px] border-black rounded-[5px]">
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <Remove />
            </IconButton>
            <Typography className="w-[25px] text-center">{count}</Typography>
            <IconButton onClick={() => setCount(count + 1)}>
              <Add />
            </IconButton>
          </div>
          <button
            onClick={() => {
              addToCart({ item: { ...data[0], count } });
              toast.success(`${data[0].name} - ${count} added to cart`);
            }}
            className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] duration-500 transform rounded-[5px] ml-5"
          >
            Add to Cart
          </button>
        </Box>
        <Box>
          <p className="pt-4">{data[0].details}</p>
        </Box>
      </div>
    </div>
  );
}
