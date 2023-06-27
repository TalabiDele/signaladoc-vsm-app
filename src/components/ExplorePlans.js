import React, { useState, useEffect, useContext } from "react";
import PlansCard from "./PlansCard";
import { BsPersonHeart, BsRocketTakeoff } from "react-icons/bs";
import ExploreCard from "./ExploreCard";
import { MdCorporateFare } from "react-icons/md";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";

const ExplorePlans = () => {
	const [plans, setPlans] = useState();

	const { user } = useContext(AuthContext);

	const cookies = new Cookies();

	// useEffect(() => {
	//   const handlePlans = async () => {
	//     const res = await fetch(
	//       `https://app.signaladoc.ng/api/v2/vsm-offshoot/mtn-mp/finance/price`,
	//       {
	//         method: "GET",
	//         headers: {
	//           "Content-Type": "application/json",
	//           Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
	//         },
	//       }
	//     );

	//     const data = await res.json();

	//     setPlans(data);

	//     console.log(data);
	//   };

	//   handlePlans();
	// }, []);

	return (
		<div className=" mt-[3rem] w-[70vw] mx-auto">
			<p className="text-xl text-center mb-[3rem]">
				Plans specially tailored for you
			</p>
			<div className=" w-full flex justify-between">
				<ExploreCard
					icon={<BsPersonHeart className=" text-primary" />}
					type={"Individual"}
					text={`Monitor your vital signs and keep track of important health information every day, all year long for as low as`}
					price={"1000"}
					color={"bg-input_bg mr-[1rem]"}
				/>
				<ExploreCard
					icon={<MdCorporateFare className=" text-brown" />}
					type={"Coorporate"}
					text={`Revitalize your workplace with SignalADoc Vital Signs Monitoring: Your ultimate solution for employee well-being!`}
					color={"bg-light_brown mr-[1rem]"}
				/>
				<ExploreCard
					icon={<BsRocketTakeoff className=" text-bg_green" />}
					type={"Pay as You Go"}
					amount={"500"}
					duration={"one off"}
					text={`Want to see how it works? 
            Pay to take a reading just once!`}
					color={"bg-gray_bg"}
				/>
			</div>
		</div>
	);
};

export default ExplorePlans;
