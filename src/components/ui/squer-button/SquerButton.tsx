import { FC } from "react";
import { IconType } from "react-icons";

interface ISquereButton {
  Icon: IconType;
  onClick: () => void;
  number?: number;
  clName?: any;
}
const SquerButton: FC<ISquereButton> = ({ Icon, onClick, number, clName }) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className={`h-12 w-12 bg-red-700 flex justify-center items-center rounded-[5px] hover:bg-red-500 transition-colors duration-200 relative ${clName}`}
      >
        {!!number && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-500 text-[0.75rem]   text-white">
            {number}
          </span>
        )}
        <Icon color="white" size={21} />
      </button>
    </div>
  );
};
export default SquerButton;
