import React from "react";
import iconOne from "../assets/images/icon-1.png";
import iconTwo from "../assets/images/icon-2.png";
import iconThree from "../assets/images/icon-3.png";
import iconFour from "../assets/images/icon-4.png";
import vector from "../assets/images/bg-vector.png";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import "./General.scss";

const Cards = () => {
  return (
    <div className=" bg-white text-text_gray relative z-[1] pb-[5rem]">
      <img
        src={vector}
        alt=""
        className=" absolute -z-[2] top-[10rem] left-[1rem] max-md:top-[11rem]"
      />
      <div className=" w-[90%] mx-auto">
        <div className=" text-center">
          <h1 className=" font-bold text-3xl mt-[0rem] pt-[5rem] max-sm:text-2xl">
            Monitoring Your Vital Signs has Never been this simple
          </h1>
          <p className=" text-lg medium">
            Start your journey to a healthy lifestyle!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 w-[90%] mx-auto justify-items-between mt-[5rem] max-sm:grid max-sm:grid-cols-1 max-sm:justify-items-center max-md:grid max-md:grid-cols-1 max-md:justify-items-center max-lg:grid max-lg:grid-cols-2 max-lg:justify-items-center max-xl:grid max-xl:grid-cols-2 max-xl:justify-items-center">
        <div className=" shadow-xl rounded-lg w-[90%] py-[1rem] px-[2rem] bg-white max-sm:mb-[1rem] max-md:mb-[1rem] max-lg:mb-[1rem] max-lg:w-[95%] max-xl:w-[80%] max-xl:mb-[1rem] max-md:w-[20rem]">
          <div className=" bg-primary h-[3rem] w-[3rem] rounded-full p-[7px] grid items-center mb-[0.5rem]">
            <img src={iconOne} alt="" className=" mb-[0.5rem]" />
          </div>
          <h1 className=" font-bold mb-[0.5rem]">Monitor your vital signs</h1>
          <p className=" text-md">
            Keep track of your heart rate, blood pressure, respiratory rate,
            oxygen and stress levels.
          </p>
        </div>
        <div className=" shadow-xl rounded-lg w-[90%] py-[1rem] px-[2rem] bg-white max-sm:mb-[1rem] max-md:mb-[1rem] max-lg:mb-[1rem] max-lg:w-[95%] max-xl:w-[80%] max-xl:mb-[1rem] max-md:w-[20rem]">
          <div className=" bg-primary h-[3rem] w-[3rem] rounded-full p-[7px] grid items-center mb-[0.5rem]">
            <img src={iconTwo} alt="" className=" mb-[0.5rem]" />
          </div>
          <h1 className=" font-bold mb-[0.5rem]">
            Understand your health data
          </h1>
          <p className=" text-md">
            Get the stats and graphs of your vital signs, download reports and
            share them with your doctor.
          </p>
        </div>
        <div className=" shadow-xl rounded-lg w-[90%] py-[1rem] px-[2rem] bg-white max-sm:mb-[1rem] max-md:mb-[1rem] max-lg:mb-[1rem] max-lg:w-[95%] max-xl:w-[80%] max-md:w-[20rem]">
          <div className=" bg-primary h-[3rem] w-[3rem] rounded-full p-[7px] grid items-center mb-[0.5rem]">
            <img src={iconThree} alt="" className=" " />
          </div>
          <h1 className=" font-bold mb-[0.5rem]">
            Get insights on healthy living.
          </h1>
          <p className=" text-md">
            Gain access to relatable articles and health insights to help you
            live healthier.
          </p>
        </div>
        <div className=" shadow-xl rounded-lg w-[90%] py-[1rem] px-[2rem] bg-white max-sm:mb-[1rem] max-md:mb-[1rem] max-lg:mb-[1rem] max-lg:w-[95%] max-xl:w-[80%] max-md:w-[20rem]">
          <div className=" bg-primary h-[3rem] w-[3rem] rounded-full p-[7px] grid items-center mb-[0.5rem]">
            <img src={iconFour} alt="" className=" mb-[0.5rem]" />
          </div>
          <h1 className=" font-bold mb-[0.5rem]">
            Build healthy habits to keep you on track
          </h1>
          <p className=" text-md">
            You can join a challenge! Consistently build a healthy habit and
            improve your lifestyle.
          </p>
        </div>
      </div>

      <img
        src={vector}
        alt=""
        className=" absolute -z-[2] top-[18rem] right-[1rem] max-xl:top-[30rem] max-md:top-[60rem]"
      />

      <div className=" flex justify-center mt-[5rem]">
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
    </div>
  );
};

export default Cards;
