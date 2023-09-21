import { useCookies } from "@/state/state";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FiUserCheck } from "react-icons/fi";

const DropDownUI = ({ userInfo, logOut }: any) => {
  const router = useRouter();
  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "p-0 border-small border-divider bg-background",
        arrow: "bg-default-200",
      }}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          className="h-12 w-12 rounded-[5px] bg-red-700  hover:bg-red-500 transition-colors duration-200"
        >
          <FiUserCheck color="white" size={21} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => {
          switch (key) {
            case "logout":
              logOut();
              break;
            case "user":
              router.push("/profile");
              break;
          }
        }}
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-white",
            "data-[hover=true]:bg-red-500",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={userInfo.name}
              description={userInfo.email}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              // avatarProps={{
              //   size: "sm",
              //   src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              // }}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Actions">
          <DropdownItem key="user">Profile</DropdownItem>
          <DropdownItem key="order">Order history</DropdownItem>
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownUI;
