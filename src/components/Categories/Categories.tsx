"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useCategories } from "@/hook/useCustomQuery";
import Item from "../Item/Item";
import ErrorData from "../Error/ErrorData";
import Spinner from "../Spinner/Spinner";

const Categories: FC = () => {
  const { data, isLoading, isError } = useCategories();
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <ErrorData />
      </div>
    );

  if (isLoading)
    return (
      <>
        <Box width="80%" margin="50px auto">
          <div className="p-5">
            <Spinner />
          </div>
        </Box>
      </>
    );
  return (
    <>
      <Box width="80%" margin="50px auto">
        <Typography variant="h3" textAlign="center">
          Categories
        </Typography>
        <Box
          margin="0 auto"
          className="mt-5"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {data.map((item: any) => (
            <Item item={item} key={item.id} isCategory={true} />
            //   <Item item={el} key={el.id} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default Categories;
