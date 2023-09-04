import Spinner from "@/components/Spinner/Spinner";
import { useCategories } from "@/hook/useCustomQuery";
import { useFilter } from "@/state/state";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const SelectCategory = () => {
  const { filter, setFilter } = useFilter((state) => state);
  const { data, isLoading } = useCategories();
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const categoryHandler = (e: SelectChangeEvent<string>) => {
    console.log("e", e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div className="min-w-[300px]">
      <Select fullWidth value={filter} onChange={categoryHandler}>
        <MenuItem value="all">All</MenuItem>
        {data &&
          data.map((el: { id: string; category: string }) => (
            <MenuItem key={el.id} value={el.category}>
              {el.category}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default SelectCategory;
