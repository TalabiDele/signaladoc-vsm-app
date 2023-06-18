import React from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import "./General.scss";

const TransactRow = ({ type, date, refe, amount, status }) => {
  return (
    <div>
      <div className=" flex items-center justify-between p-[2rem] border-b border-b-input_border">
        <div className="bg-light_blue h-[4rem] w-[4rem] rounded-full flex items-center justify-center">
          <BsFillCreditCard2FrontFill className=" text-bg_green text-4xl" />
        </div>
        <p className=" medium text-2xl">{type}</p>
        <p className="">{date}</p>
        <p className="">Ref: {refe}</p>
        <p className=" bold text-3xl text-primary">₦{amount}</p>
        <p className="">{status}</p>
      </div>
    </div>
  );
};

export default TransactRow;
