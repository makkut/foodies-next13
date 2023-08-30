import { useState } from "react";
import { IconButton, Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
// import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useCart, useFavorites, useFilter } from "@/state/state";
import { useRouter } from "next/navigation";

const Item = ({ item, width, isCategory }: any) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const { setFilter } = useFilter();
  const { addToCart } = useCart();
  const { toggleFavorites, favorites } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const { category, price, name, imageUrl, id } = item;
  console.log("item", item);
  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Image
          className="cursor-pointer"
          alt={name}
          width={300}
          height={534}
          src={imageUrl}
          onClick={
            () => router.push(`/shop/${id}`)
            // !isCategory
            //   ? () => router.push(`/items/${id}`)
            //   : () => {
            //       setFilter(item.category);
            //       router.push(`/shop`);
            //     }
          }
        />
        {!isCategory ? (
          <Box className="absolute top-[5%] left-[77%] px-[5%] py-0">
            {favorites.find((i: any) => i.id === item.id) ? (
              <button onClick={() => toggleFavorites({ item: { ...item } })}>
                <MdFavorite color="white" size={32} />
              </button>
            ) : (
              <button onClick={() => toggleFavorites({ item: { ...item } })}>
                <MdFavoriteBorder color="white" size={32} />
              </button>
            )}
          </Box>
        ) : (
          <Box className="absolute top-[5%] left-[5%] px-[5%] py-0 text-white text-lg font-bold">
            <button
              onClick={() => {
                // setFilter(item.category);
                // router.push(`/shop`);
              }}
            >
              {item.name}
            </button>
          </Box>
        )}
        {!isCategory && (
          <Box
            // display={isHovered ? "block" : "none"}
            className="absolute bottom-[10%] left-0 w-[100%] px-[5%] py-0"
          >
            <Box className="flex justify-between">
              <Box
                className="flex items-center 
            rounded-[3px] bg-white"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <Remove />
                </IconButton>
                <Typography className="text-red-600">{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <Add />
                </IconButton>
              </Box>
              <button
                onClick={() => {
                  addToCart({ item: { ...item, count } });
                  toast.success(`${name} - ${count} added to cart`);
                }}
                className="text-white bg-red-600 hover:bg-red-500 px-5 duration-500 transform rounded-sm"
              >
                Add to Cart
              </button>
            </Box>
          </Box>
        )}
      </Box>
      {!isCategory && (
        <Box className="mt-[3px]">
          <Typography variant="subtitle2">
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/^ ./, (str: any) => str.toUpperCase())}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight="bold">{price}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Item;
