import Spinner from "@/components/Spinner/Spinner";
import { useCategories } from "@/hook/useCustomQuery";
import { useFilter, useSort } from "@/state/state";
import { MenuItem, Select } from "@mui/material";

const SelectCategory = () => {
  const { filter, setFilter } = useFilter((state) => state);
  //   const { setCurrentPage } = usePage((state: any) => state);
  const { data, isLoading } = useCategories();
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const categoryHandler = (e: any) => {
    console.log("e", e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div className="w-[400px]">
      <Select fullWidth value={filter} onChange={categoryHandler}>
        <MenuItem value="all">All</MenuItem>
        {data &&
          data.map((el: any) => (
            <MenuItem key={el.id} value={el.category}>
              {el.category}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default SelectCategory;
