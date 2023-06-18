import React from "react";
import Buttons from "./Buttons";

const ActivePlan = ({ icon, type, amount, duration, date }) => {
  return (
    <div className=" w-[50vw] mx-auto">
      <div className=" bg-light_blue p-[1rem] w-[30rem] flex justify-between rounded-md shadow-lg items-center">
        <div className=" h-[4rem] w-[4rem] rounded-full bg-white flex items-center justify-center text-3xl">
          {icon}
        </div>
        <div className="">
          <h2 className=" mb-[0.5rem]">{type}</h2>
          <h1 className=" text-primary text-4xl mb-[0.5rem]">
            ₦{amount}/<span className=" text-sm mb-[0.5rem]">{duration}</span>
          </h1>
          <p className=" text-sm mb-[0.5rem]">Auto renewal: {date}</p>
          <div className=" flex ">
            <Buttons
              text={"Change subscription"}
              px={"px-[1rem]"}
              color={"text-white"}
              bg={"bg-primary"}
            />
            <Buttons
              text={"Cancel subscription"}
              px={"px-[1rem]"}
              color={"text-text_gray"}
              bg={"none"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePlan;
