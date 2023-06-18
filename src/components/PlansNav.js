import React from "react";
import { Link } from "react-router-dom";

const PlansNav = () => {
  const pathname = window.location.pathname;

  return (
    <div className=" w-[100vw] pt-[7rem]">
      <div className=" w-[50vw] mx-[auto] flex items-center justify-between">
        <Link
          to="/plans"
          className={` ${
            pathname === "/plans" && "bg-primary text-white"
          } bg-gray_bg text-black py-[0.5rem] px-[1rem] rounded-md`}
        >
          Active subscription
        </Link>
        <Link
          to="/plans/explore"
          className={` ${
            pathname === "/plans/explore" && "bg-primary text-white"
          } bg-gray_bg text-black py-[0.5rem] px-[1rem] rounded-md`}
        >
          Explore plans
        </Link>
        <Link
          to="/plans/discounts"
          className={` ${
            pathname === "/plans/discounts" && "bg-primary text-white"
          } bg-gray_bg text-black py-[0.5rem] px-[1rem] rounded-md`}
        >
          Discounts
        </Link>
        <Link
          to="/plans/history"
          className={` ${
            pathname === "/plans/history" && "bg-primary text-white"
          } bg-gray_bg text-black py-[0.5rem] px-[1rem] rounded-md`}
        >
          Transaction history
        </Link>
      </div>
    </div>
  );
};

export default PlansNav;
