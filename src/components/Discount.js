import React from "react";
import Unavailable from "./Unavailable";
import image from "assets/images/discount.png";
import DiscountCard from "./DiscountCard";
import firstBank from "assets/images/firstbank.png";
import gtb from "assets/images/gtb.png";

const Discount = () => {
  return (
    <div>
      <div className="">
        {/* <div className="flex w-[50vw] mx-auto">
          <DiscountCard
            logo={firstBank}
            text={"Get 30% discount when you pay with your first bank card"}
          />
          <DiscountCard
            logo={gtb}
            text={"Get 30% discount when you pay with your first bank card"}
          />
        </div> */}
        <Unavailable
          text={"There are no discounts available. Check back another time!"}
          icon={image}
        />
      </div>
    </div>
  );
};

export default Discount;
