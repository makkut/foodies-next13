"use client";
import styles from "./Header.module.scss";
import { FC } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderProfile from "./HeaderProfile";

import HeaderMobileMenu from "./HeaderMobileMenuButton";
import CartDrawer from "../CartDrawer/CartDrawer";
import FavoritesDrawer from "../FavoritesDrawer/FavoritesDrawer";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <div className="hidden md:block">
        <HeaderMenu />
        <CartDrawer />
        <FavoritesDrawer />
      </div>
      <div className="flex">
        <HeaderProfile />
        <div className="block md:hidden  ml-3 pr-2">
          {/* <HeaderMobileMenu /> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
