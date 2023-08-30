import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import styles from "./HeaderMobileMenu.module.scss";
import { useMobileMenu } from "@/state/state";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import SeachInput from "../ui/search/SearchInput";
import { useRouter } from "next/navigation";

const HeaderMobileMenu: FC = () => {
  const router = useRouter();
  const { isMobileMenu, setMobileMenu } = useMobileMenu();
  return (
    <>
      <Drawer
        open={isMobileMenu}
        anchor="right"
        onClose={() => setMobileMenu()}
      >
        <Box sx={{ width: 320, paddingX: 2 }} role="presentation">
          <div className="text-right">
            <IconButton onClick={() => setMobileMenu()}>
              <Close />
            </IconButton>
          </div>
          <div className="flex justify-center mb-5">
            <Link href="/" onClick={() => setMobileMenu()}>
              <Image src="/logo.png" width={80} height={80} alt="logo" />
            </Link>
          </div>
          <Divider />
          <div className="py-4">
            <SeachInput />
          </div>
          <Divider />
          <Box>
            <List>
              <ListItem disablePadding className="text-center">
                <ListItemButton
                  onClick={() => {
                    setMobileMenu();
                    router.push(`/`);
                  }}
                >
                  Home
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="text-center">
                <ListItemButton
                  onClick={() => {
                    setMobileMenu();
                    router.push(`/shop`);
                  }}
                >
                  Shop
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="text-center">
                <ListItemButton
                  onClick={() => {
                    setMobileMenu();
                    router.push(`/categories`);
                  }}
                >
                  Category
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="text-center">
                <ListItemButton
                  onClick={() => {
                    setMobileMenu();
                    router.push(`/about`);
                  }}
                >
                  About
                </ListItemButton>
              </ListItem>
            </List>
            {/* <Box>
              {favorites.map((item: any) => {
                return (
                  <Box key={`${item.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      <Box flex="1 1 40%">
                        <Image
                          className="cursor-pointer"
                          alt={item?.name}
                          width={123}
                          height={164}
                          src={item.imageUrl}
                          onClick={() => {
                            setIsFavoritesOpen();
                            router.push(`/items/${item.id}`);
                          }}
                        />
                      </Box>
                      <Box flex="1 1 60%" className="pl-2">
                        <FlexBox mb="5px">
                          <p
                            className="font-bold cursor-pointer"
                            onClick={() => {
                              setIsFavoritesOpen();
                              router.push(`/items/${item.id}`);
                            }}
                          >
                            {item.name}
                          </p>
                          <IconButton
                            onClick={() => removeFromFavorites({ id: item.id })}
                          >
                            <Close />
                          </IconButton>
                        </FlexBox>
                        <p>{`${item.details.slice(0, 80)}...`}</p>
                        <p className="pl-2 pt-2 font-bold">{item.price} $</p>
                        <FlexBox m="15px 0">
                          <button
                            onClick={() => {
                              addToCart({
                                item: { ...item, count: 1 },
                              });
                              toast.success(`${item.name} - 1 added to cart`);
                            }}
                            className="text-white bg-red-600 hover:bg-red-500 px-5 py-2 duration-500 transform rounded-sm"
                          >
                            Add to Cart
                          </button>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                );
              })}
            </Box> */}
          </Box>
        </Box>

        {/* <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <div className="flex justify-center">
              <Link href="/" onClick={() => setMobileMenu()}>
                <Image src="/logo.png" width={80} height={80} alt="logo" />
              </Link>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.menu}>
              <nav>
                <ul>
                  <li>
                    <Link href="/" onClick={() => setMobileMenu()}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" onClick={() => setMobileMenu()}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => setMobileMenu()}>
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => setMobileMenu()}>
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </DrawerBody>
        </DrawerContent> */}
      </Drawer>
    </>
  );
};
export default HeaderMobileMenu;
