import ActivePlan from "components/ActivePlan";
import NoPlans from "components/NoPlans";
import PlansNav from "components/PlansNav";
import React, { useEffect, useContext } from "react";
import { BsPersonHeart } from "react-icons/bs";
import AuthContext from "components/context/AuthContext";
import { useHistory } from "react-router-dom";

const Plans = () => {
	const { user } = useContext(AuthContext);

	const history = useHistory();

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}
	}, []);

	return (
		<div>
			{/* <NoPlans />
      <ActivePlan
        icon={<BsPersonHeart className=" text-primary" />}
        type={"Individual"}
        duration={"Monthly"}
        amount={"1000"}
        date={"Mar 30, 2023"}
      /> */}
		</div>
	);
};

export default Plans;
