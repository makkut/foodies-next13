"use client";
import { FC } from "react";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart, useFavorites, useFilter, useSearch } from "@/state/state";
import dynamic from "next/dynamic";
import SeachInput from "../ui/search/SearchInput";

const DynamicSquerButton = dynamic(
  () => import("../ui/squer-button/SquerButton"),
  {
    ssr: false,
  }
);

const HeaderProfile: FC = () => {
  const router = useRouter();
  const { cart, setIsCartOpen } = useCart();
  const { favorites, setIsFavoritesOpen } = useFavorites();
  const { setSearch, search } = useSearch();

  console.log("search", search);
  const searchGoods = () => {
    router.push(`/search?query=${search}`);
    setSearch("");
  };

  return (
    <div className="flex justify-center items-center mr-3">
      <div className="mr-3 hidden lg:block">
        <SeachInput />
      </div>
      <div className="mr-3">
        <DynamicSquerButton
          Icon={MdFavoriteBorder}
          onClick={() => {
            setIsFavoritesOpen();
          }}
          number={favorites.length}
        />
      </div>
      <div className="mr-3">
        <DynamicSquerButton
          Icon={FiShoppingCart}
          onClick={() => {
            setIsCartOpen();
          }}
          number={cart.length}
        />
      </div>
      <DynamicSquerButton Icon={FiUser} onClick={() => {}} />
    </div>
  );
};
export default HeaderProfile;
