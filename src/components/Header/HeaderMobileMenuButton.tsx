import { FC } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";

const HeaderMobileMenuButton: FC = () => {
  const { setIsMenuOpen } = useActions();
  const isMenuOpen = useSelector((state: any) => state.menu.isMenuOpen);
  return (
    <>
      <div className="bg-red-700 rounded-[5px] hover:bg-red-500 transition-colors duration-200">
        <Hamburger
          size={22}
          toggled={isMenuOpen}
          toggle={() => setIsMenuOpen()}
          color="white"
        />
      </div>
    </>
  );
};
export default HeaderMobileMenuButton;
