import React from "react";

const Unavailable = ({ text, icon }) => {
  return (
    <div>
      <div className=" text-center grid justify-items-center">
        <p className=" my-[3rem] text-xl">{text}</p>
        <img src={icon} alt="" className=" w-[30rem]" />
      </div>
    </div>
  );
};

export default Unavailable;
