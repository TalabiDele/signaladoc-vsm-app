import React from "react";
import Buttons from "./Buttons";
import video from "../assets/images/vid.png";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./General.scss";

const Action = () => {
  return (
    <div className=" bg-light_blue py-[5rem]">
      <div className=" w-[90%] mx-auto flex items-center justify-between max-md:flex-col max-md:text-center">
        <div className="text-text_gray max-lg:w-[50%] max-md:mb-[2rem] max-md:w-[70%] max-sm:w-full">
          <h1 className=" font-bold mb-[1rem] mt-[0rem] text-4xl max-lg:text-4xl max-sm:text-2xl">
            How Our Technology Works
          </h1>
          <p className=" text-xl mb-[1rem] max-sm:text-sm medium">
            Your Face + Our AI Technology = Your Vital Signs
          </p>
          <Link to="/register">
            <Buttons
              text={"Get Started"}
              bg={"bg-primary"}
              border={"border-2 border-primary"}
              color={"text-white"}
              px={"px-[5rem]"}
            />
          </Link>
        </div>

        {/* <img
          src={video}
          alt=""
          className=" w-[30rem] max-xl:w-[45%] max-md:w-[60%] max-sm:w-[70%]"
        /> */}

        <div className=" max-xl:w-[60%] max-md:w-[80%] max-sm:w-[80%] w-[40%]">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=zFLVdeOALbI"
            controls={true}
            loop={true}
            width="100%"
            // height="90%"
          />
        </div>
        {/* <video src={video} width="750" height="500" controls>
     </video> */}
      </div>
    </div>
  );
};

export default Action;
