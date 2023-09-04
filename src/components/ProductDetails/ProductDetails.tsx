"use client";
import { useGood } from "@/hook/useCustomQuery";
import { useCart } from "@/state/state";
import { Add, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorData from "../Error/ErrorData";
import Spinner from "../Spinner/Spinner";

type Props = {
  id: string;
};

export default function ProductDetails({ id }: Props) {
  const { data, isLoading, isError } = useGood(id);
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();
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
      <Box width={800}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                className=""
                alt={data[0].name}
                width={300}
                height={534}
                src={data[0].imageUrl}
              />
            </Box>
          </Grid>
          <Grid item md={8} xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <div className="pl-6">
                <h3 className="font-bold text-lg">{data[0].name}</h3>

                <Box className="mt-[3px]">
                  <Typography variant="subtitle2">
                    {data[0].category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^ ./, (str: string) => str.toUpperCase())}
                  </Typography>
                  <p className="font-bold text-base pt-4">{data[0].price} $</p>
                </Box>
                <Box
                  className="lg:flex items-center 
            rounded-[3px] bg-white w-[320px] lg:w-[500px]"
                >
                  <div className="mb-5 lg:mb-0 flex items-center border-[1px] border-black rounded-[5px] mr-5 w-[97px]">
                    <IconButton
                      onClick={() => setCount(Math.max(count - 1, 1))}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="w-[25px] text-center">
                      {count}
                    </Typography>
                    <IconButton onClick={() => setCount(count + 1)}>
                      <Add />
                    </IconButton>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({ item: { ...data[0], count } });
                      toast.success(`${data[0].name} - ${count} added to cart`);
                    }}
                    className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] duration-500 transform rounded-[5px] w-[240px]"
                  >
                    Add to Cart
                  </button>
                </Box>
                <Box>
                  <p className="pt-4">{data[0].details}</p>
                </Box>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
