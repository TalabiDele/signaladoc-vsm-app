import React from "react";
import Buttons from "./Buttons";

const PlansCard = ({ icon, type, amount, duration, text }) => {
  return (
    <div>
      <div className=" bg-white p-[1rem] w-[20rem] flex justify-between rounded-md shadow-lg items-center flex-col mx-auto text-center">
        <div className=" h-[4rem] w-[4rem] rounded-full bg-white flex items-center justify-center text-3xl">
          {icon}
        </div>
        <div className="">
          <h2 className=" mb-[1rem]">{type}</h2>
          <h1 className=" text-primary text-4xl mb-[1rem]">
            ₦{amount}/<span className=" text-sm mb-[1rem]">{duration}</span>
          </h1>
          <p className=" text-md mb-[1rem] w-[80%] mx-auto">{text}</p>
          <div className=" flex ">
            <Buttons
              text={"Choose Plan"}
              px={"px-[1rem] w-full"}
              color={"text-white"}
              bg={"bg-primary"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansCard;
