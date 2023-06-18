import React from "react";
import Unavailable from "./Unavailable";
import image from "assets/images/transaction.png";
import TransactRow from "./TransactRow";

const Transaction = () => {
  return (
    <div>
      <div className=" w-[70%] mx-auto">
        <TransactRow
          type={"Subscription"}
          date={"Mar 14, 2023 11:23AM"}
          refe={"VSM- 59861-1677239107"}
          amount={"3000"}
          status={"Successful"}
        />
        <Unavailable icon={image} text={"No Transaction History"} />
      </div>
    </div>
  );
};

export default Transaction;
