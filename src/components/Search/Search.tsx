"use client";

import { useGoods } from "@/hook/useCustomQuery";
import { useFilter, useSort } from "@/state/state";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import Item from "../Item/Item";
import TabMenu from "../ui/tab-menu/TabMenu";
import SelectCategory from "../ui/select/SelectCategory";
import SelectSort from "../ui/select/SelectSort";

const Search = ({ query }: any) => {
  console.log("query", query);
  const { filter, setFilter } = useFilter((state) => state);
  const { sort, setSort } = useSort((state) => state);
  const { data, isLoading, isError } = useGoods(filter, query, sort);

  if (isLoading)
    return (
      <>
        {" "}
        <Box width="80%" margin="50px auto">
          <Typography variant="h3" textAlign="center">
            Search &quot;{query}&quot;
          </Typography>
          <div className="flex justify-around">
            <SelectCategory />
            <SelectSort />
          </div>
        </Box>
      </>
    );
  return (
    <>
      <Box width="80%" margin="50px auto">
        <Typography variant="h3" textAlign="center">
          Search &quot;{query}&quot;
        </Typography>
        <div className="flex justify-around">
          <SelectCategory />
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
        {/* {paginationPage > 1 ? (
          <PaginationButtonBlock
            disabledNext={currentPage === paginationPage}
            onClickNext={() => setCurrentPage(currentPage + 1)}
            disabledPrev={currentPage === 1}
            onClickPrev={() => setCurrentPage(currentPage - 1)}
            numPages={`${currentPage} / ${paginationPage}`}
          />
        ) : (
          <></>
        )} */}
      </Box>
    </>
  );
};

export default Search;
