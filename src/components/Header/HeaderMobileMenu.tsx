import { useActions } from "@/hooks/useActions";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "./HeaderMobileMenu.module.scss";

const HeaderMobileMenu: FC = () => {
  const { setIsMenuOpen } = useActions();
  const isMenuOpen = useSelector((state: any) => state.menu.isMenuOpen);
  return (
    <>
      <Drawer
        placement="right"
        onClose={() => setIsMenuOpen()}
        isOpen={isMenuOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <div className="flex justify-center">
              <Link href="/" onClick={() => setIsMenuOpen()}>
                <Image src="/logo.png" width={80} height={80} alt="logo" />
              </Link>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.menu}>
              <nav>
                <ul>
                  <li>
                    <Link href="/" onClick={() => setIsMenuOpen()}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" onClick={() => setIsMenuOpen()}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => setIsMenuOpen()}>
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => setIsMenuOpen()}>
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default HeaderMobileMenu;
