import React from "react";
import bg from "../assets/images/whiteBg.png";
import image from "../assets/images/landing-image.png";

const AccountBanner = () => {
  return (
    <div className=" bg-primary h-[100vh] w-[50vw] max-lg:hidden">
      <div className=" relative w-full mx-auto grid items-center justify-items-center h-[100vh]">
        <img src={bg} alt="" className=" relative" />
        <img src={image} alt="" className=" absolute bottom-0 top-[10rem]" />
      </div>
    </div>
  );
};

export default AccountBanner;
