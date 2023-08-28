import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const HeaderLogo: FC = () => {
  return (
    <>
      <div className="md:pl-10">
        <Link href="/">
          <Image src="/logo.png" width={120} height={100} alt="logo" />
        </Link>
      </div>
    </>
  );
};
export default HeaderLogo;
