import { FC } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { useMobileMenu } from "@/state/state";

const HeaderMobileMenuButton: FC = () => {
  const { isMobileMenu, setMobileMenu } = useMobileMenu();
  return (
    <>
      <div className="bg-red-700 rounded-[5px] hover:bg-red-500 transition-colors duration-200">
        <Hamburger
          size={22}
          toggled={isMobileMenu}
          toggle={() => setMobileMenu()}
          color="white"
        />
      </div>
    </>
  );
};
export default HeaderMobileMenuButton;
