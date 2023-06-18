import React from "react";
import Buttons from "./Buttons";
import landingBg from "../assets/images/landing-bg.png";
import landingImg from "../assets/images/landing-image.png";
import { Link } from "react-router-dom";

// import { motion as m } from "framer-motion";

const Landing = () => {
  return (
    <div className=" bg-white max-md:pt-[10rem] pt-[5rem]">
      <div className=" flex justify-between w-[90%] mx-auto items-center pt-[3rem] max-lg:flex-col max-lg:pt-[0rem]">
        <div className=" w-[50rem] leading-[1.5] text-text_gray max-xl:w-[75rem] max-lg:w-[90%] max-lg:text-center max-lg:mx-auto max-lg:mb-[2rem]">
          <h1 className=" text-6xl font-bold max-2xl:text-5xl max-lg:text-4xl max-md:text-4xl max-w-[90%] max-lg:mx-auto max-sm:text-3xl">
            Get Real-time Vital Signs Monitoring All From Your Device
          </h1>
          <p className=" text-lg mb-[2rem] max-lg:text-[1rem] max-w-[90%] max-lg:mx-auto max-sm:text-sm">
            Our non-invasive technology is a video-based vital signs monitoring
            App that helps you keep track of important health information. Now
            you can get precise readings at the push of a button!
          </p>
          <Link to="/register">
            <Buttons
              bg={"bg-primary"}
              border={"border-2 border-primary"}
              color={"text-white"}
              text={"Get Started"}
              px={"px-[5rem]"}
            />
          </Link>
        </div>

        <div className=" relative w-[60rem] max-xl:w-[70rem] max-lg:w-[90%] max-lg:mx-auto">
          {/* <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 0.5 }}
            className=""
          > */}
          <img
            src={landingImg}
            alt=""
            className=" absolute z-[3] w-[60rem] object-cover max-xl:w-[70rem] max-lg:w-[90%] max-lg:mx-auto"
          />
          {/* </m.div> */}
          <img
            src={landingBg}
            alt=""
            className=" relative w-[45rem] max-2xl:w-[35rem] object-cover mx-auto mx-lg:w-[35rem] max-lg:w-[60%] max-lg:mx-auto max-sm:w-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
