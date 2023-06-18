import ActivePlan from "components/ActivePlan";
import NoPlans from "components/NoPlans";
import PlansNav from "components/PlansNav";
import React from "react";
import { BsPersonHeart } from "react-icons/bs";

const Plans = () => {
  return (
    <div>
      <NoPlans />
      <ActivePlan
        icon={<BsPersonHeart className=" text-primary" />}
        type={"Individual"}
        duration={"Monthly"}
        amount={"1000"}
        date={"Mar 30, 2023"}
      />
    </div>
  );
};

export default Plans;
