import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiSearch, FiBell, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";

const HeaderButtons: FC = () => {
  const { setIsCartOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  return (
    <div className="flex justify-between items-center w-[180px]">
      <SquerButton Icon={FiSearch} onClick={() => {}} />
      <SquerButton Icon={FiBell} onClick={() => {}} />
      <SquerButton
        Icon={FiShoppingCart}
        onClick={() => {
          setIsCartOpen();
        }}
        number={cart.length}
      />
    </div>
  );
};
export default HeaderButtons;
