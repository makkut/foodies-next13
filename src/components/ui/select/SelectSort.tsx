import { useSort } from "@/state/state";
import { MenuItem, Select } from "@mui/material";

const SelectSort = () => {
  const { sort, setSort } = useSort((state) => state);
  const sortHandler = (e: any) => {
    setSort(e.target.value);
  };

  return (
    <div className="w-[400px]">
      <Select fullWidth value={sort} onChange={sortHandler}>
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="lowest">Price: Low to High</MenuItem>
        <MenuItem value="highest">Price: High to Low</MenuItem>
      </Select>
    </div>
  );
};

export default SelectSort;
