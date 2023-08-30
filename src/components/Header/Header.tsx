"use client";
import styles from "./Header.module.scss";
import { FC } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderProfile from "./HeaderProfile";
import CartDrawer from "../CartDrawer/CartDrawer";
import FavoritesDrawer from "../FavoritesDrawer/FavoritesDrawer";
import HeaderMobileMenuButton from "../ui/squer-button/HeaderMobileMenuButton";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <div className="hidden lg:block">
        <HeaderMenu />
      </div>

      <div className="flex">
        <HeaderProfile />
        <div className="mr-3 block lg:hidden">
          <HeaderMobileMenuButton />
        </div>
      </div>
    </header>
  );
};
export default Header;
