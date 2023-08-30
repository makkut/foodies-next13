import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMobileMenu, useSearch } from "@/state/state";
import { useRouter } from "next/navigation";

const SeachInput = () => {
  const router = useRouter();
  const { setMobileMenuFalse } = useMobileMenu();
  const handleChange = (event: any) => setSearch(event.target.value);
  const { setSearch, search } = useSearch();

  const searchGoods = () => {
    setSearch("");
    setMobileMenuFalse();
    router.push(`/search?query=${search}`);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    searchGoods();
  };

  return (
    <Paper component="form" className="flex" onSubmit={submitHandler}>
      <InputBase
        className="pl-3 h-[48px] w-[100%]"
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        value={search}
      />
      <IconButton
        className="text-red-700 w-[48px]"
        aria-label="directions"
        onClick={() => searchGoods()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SeachInput;
