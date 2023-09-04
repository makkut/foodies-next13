import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
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
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
export default HeaderMobileMenu;
