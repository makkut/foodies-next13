"use client";

import { useGoods, useGoodsLength } from "@/hook/useCustomQuery";
import { useFilter, usePage, useSort } from "@/state/state";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import Item from "../Item/Item";
import TabMenu from "../ui/tab-menu/TabMenu";
import SelectCategory from "../ui/select/SelectCategory";
import SelectSort from "../ui/select/SelectSort";
import Spinner from "../Spinner/Spinner";
import ErrorData from "../Error/ErrorData";
import { PaginationButtonBlock } from "../ui/pagination/PaginationButtonBlock";

const Search = ({ query }: any) => {
  console.log("query", query);
  const { filter } = useFilter((state) => state);
  const { sort } = useSort((state) => state);
  const { currentPage, itemsPerPage, setCurrentPage } = usePage(
    (state: any) => state
  );
  const { data, isLoading, isError } = useGoods(
    currentPage,
    itemsPerPage,
    filter,
    query,
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
          <Typography variant="h4" textAlign="center">
            Search &quot;{query}&quot;
          </Typography>
          <div className="flex justify-around p-5">
            <SelectCategory />
            <SelectSort />
          </div>
          <div className="p-5">
            <Spinner />
          </div>
        </Box>
      </>
    );
  return (
    <>
      <Box width="80%" margin="50px auto">
        <Typography variant="h4" textAlign="center">
          Search &quot;{query}&quot;
        </Typography>
        <div className="flex justify-around p-5">
          <SelectCategory />
          <div className="w-5"></div>
          <SelectSort />
        </div>

        {/* <SelectUI /> */}
        <Box
          margin="0 auto"
          className="mt-5"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {data.map((el: any) => (
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

export default Search;
