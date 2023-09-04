"use client";

import { useGoods, useGoodsLength } from "@/hook/useCustomQuery";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import TabMenu from "../ui/tab-menu/TabMenu";
import { useFilter, usePage, useSort } from "@/state/state";
import Item from "../Item/Item";
import Spinner from "../Spinner/Spinner";
import ErrorData from "../Error/ErrorData";
import { PaginationButtonBlock } from "../ui/pagination/PaginationButtonBlock";
import { ItemInterface } from "@/interfaces/interfaces";

const Shop: FC = () => {
  const { filter } = useFilter((state) => state);
  const { sort } = useSort((state) => state);
  const { currentPage, itemsPerPage, setCurrentPage } = usePage(
    (state) => state
  );
  const { data, isLoading, isError } = useGoods(
    currentPage,
    itemsPerPage,
    filter,
    "all",
    sort
  );

  const length = useGoodsLength(filter);
  const paginationPage = Math.round(length.data / itemsPerPage);

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
          <Typography variant="h3" textAlign="center">
            Shop
          </Typography>
          <TabMenu />
          <Spinner />
        </Box>
      </>
    );

  return (
    <>
      <Box width="80%" margin="50px auto">
        <Typography variant="h3" textAlign="center">
          Shop
        </Typography>
        <TabMenu />

        <Box
          margin="0 auto"
          className="mt-5"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {data.map((el: ItemInterface) => (
            <Item item={el} key={el.id} isCategory={false} />
          ))}
        </Box>
        {paginationPage > 1 ? (
          <PaginationButtonBlock
            disabledNext={currentPage === paginationPage}
            onClickNext={() => setCurrentPage(currentPage + 1)}
            disabledPrev={currentPage === 1}
            onClickPrev={() => setCurrentPage(currentPage - 1)}
            numPages={`${currentPage} / ${paginationPage}`}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
export default Shop;
