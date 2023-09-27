"use client";
import { FC, useEffect } from "react";
import { FiUser, FiUserCheck, FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart, useCookies, useFavorites } from "@/state/state";
import dynamic from "next/dynamic";
import SeachInput from "../ui/search/SearchInput";

const DynamicSquerButton = dynamic(
  () => import("../ui/squer-button/SquerButton"),
  {
    ssr: false,
  }
);

const DynamicDropDownUI = dynamic(() => import("../ui/dropdown/dropdown"), {
  ssr: false,
});

const HeaderProfile: FC = () => {
  const router = useRouter();
  const { cart, setIsCartOpen } = useCart();
  const { favorites, setIsFavoritesOpen } = useFavorites();
  const { userInfo, setUserInfo, logOut } = useCookies((state: any) => state);
  //   useEffect(() => {
  //     const localUserInfo = localStorage.getItem("userInfo");
  //     console.log("localUserInfo", localUserInfo);
  //     if (localUserInfo !== "null" || localUserInfo !== null)
  //       setUserInfo(localUserInfo);
  //   }, []);
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
      {userInfo !== null ? (
        <DynamicDropDownUI logOut={() => logOut()} userInfo={userInfo} />
      ) : (
        <DynamicSquerButton
          Icon={userInfo ? FiUserCheck : FiUser}
          onClick={() => {
            router.push(`/login`);
          }}
        />
      )}
    </div>
  );
};
export default HeaderProfile;
