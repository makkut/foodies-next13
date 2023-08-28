import { ImFacebook2, ImWhatsapp } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-[#a30005] flex justify-center md:py-0 py-5 px-1">
      <div className="md:flex bg-[#a30005] w-[1080px] justify-around block">
        <div className="flex justify-center items-center text-white text-base">
          © 2023 Russian Foodies Panama
        </div>
        <div className="flex justify-center items-center">
          <Image src="/logo_footer2.jpg" alt="logo" width={500} height={100} />
        </div>
        <div className="w-[200px] flex justify-around items-center my-0 mx-auto">
          <a href="https://www.facebook.com/russianfoodiespanama/">
            <span className="text-white hover:text-red-200 transition-colors duration-200 cursor-pointer">
              <ImFacebook2 size={33.5} />
            </span>
          </a>
          <a href="https://www.instagram.com/russianfoodiespanama/">
            <span className="text-white hover:text-red-200 transition-colors duration-200 cursor-pointer">
              <GrInstagram size={35} />
            </span>
          </a>
          <a href="https://wa.me/+50763152175">
            <span className="text-white hover:text-red-200 transition-colors duration-200 cursor-pointer">
              <ImWhatsapp size={35} />
            </span>
          </a>
        </div>
        {/* <div>Links</div> */}
      </div>
    </div>
  );
};
export default Footer;
