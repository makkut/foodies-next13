"use client";
import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import SearchIcon from "@mui/icons-material/Search";

// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, useFavorites, useFilter, useSearch } from "@/state/state";
import { IconButton, InputBase, Paper } from "@mui/material";

const HeaderProfile: FC = () => {
  const router = useRouter();
  const { cart, setIsCartOpen } = useCart();
  const { setIsFavoritesOpen, favorites } = useFavorites();
  const { setFilter } = useFilter((state) => state);
  //   const { data: session }: any = useSession();
  const handleChange = (event: any) => setSearch(event.target.value);
  const { setSearch, search } = useSearch();

  console.log("search", search);
  const searchGoods = () => {
    router.push(`/search?query=${search}`);
    setSearch("");
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    searchGoods();
  };

  return (
    <div className="flex justify-center items-center mr-3">
      <div className="mr-3">
        <Paper component="form" className="flex" onSubmit={submitHandler}>
          <InputBase
            className="pl-3 h-[48px]"
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
      </div>
      <div className="mr-3">
        <SquerButton
          Icon={MdFavoriteBorder}
          onClick={() => {
            setIsFavoritesOpen();
          }}
          number={favorites.length}
        />
      </div>
      <div className="mr-3">
        <SquerButton
          Icon={FiShoppingCart}
          onClick={() => {
            setIsCartOpen();
          }}
          number={cart.length}
        />
      </div>
      {/* <Link href={session ? "/profile" : "/signin"}> */}
      <SquerButton Icon={FiUser} onClick={() => {}} />
      {/* </Link> */}
      {/* {session && (
        <div className="ml-2 mr-3 hidden md:block">
          <div className="text-sm text-gray-600">{session.user.name}</div>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </button>
        </div>
      )} */}
    </div>
  );
};
export default HeaderProfile;
