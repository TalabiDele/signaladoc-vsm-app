import React, { useState, useEffect, useContext } from "react";
import PlansCard from "./PlansCard";
import { BsPersonHeart, BsRocketTakeoff } from "react-icons/bs";
import ExploreCard from "./ExploreCard";
import { MdCorporateFare } from "react-icons/md";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const ExplorePlans = () => {
	const [plans, setPlans] = useState();
	const [payGo, setPayGo] = useState();

	const { user, lowest, setIsLoading, isLoading } = useContext(AuthContext);

	console.log(lowest);

	const cookies = new Cookies();

	const history = useHistory();

	useEffect(() => {
		const handlePayGo = async () => {
			setIsLoading(true);
			const res = await fetch(`${API_URL}/finance/pay-go`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			setPayGo(data);

			setIsLoading(false);
		};

		handlePayGo();
	}, []);

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
		<>
			{isLoading ? (
				<></>
			) : (
				<div className="">
					{payGo && (
						<div className=" pt-[3rem] w-[70vw] mx-auto max-md:pb-[10rem]">
							<p className="medium fixed text-2xl z-[4] top-[2rem]">
								Choose a Plan
							</p>
							<p className="text-xl text-center mb-[3rem]">
								Plans specially tailored for you
							</p>
							<div className=" w-full flex justify-between max-md:flex-col items-center">
								<div
									className=" max-md:mb-[2rem]"
									onClick={() => history.push("/plans/individual")}
								>
									<ExploreCard
										icon={<BsPersonHeart className=" text-primary" />}
										type={"Individual"}
										text={`Monitor your vital signs and keep track of important health information every day, all year long for as low as`}
										price={lowest}
										color={"bg-input_bg mr-[1rem] max-md:mr-[0rem]"}
									/>
								</div>
								<div
									className=" max-md:mb-[2rem]"
									onClick={() => history.push("/plans/corporate")}
								>
									<ExploreCard
										icon={<MdCorporateFare className=" text-brown" />}
										type={"Coorporate"}
										text={`Revitalize your workplace with SignalADoc Vital Signs Monitoring: Your ultimate solution for employee well-being!`}
										color={"bg-light_brown mr-[1rem] max-md:mr-[0rem]"}
									/>
								</div>
								<div
									className=" max-md:mb-[2rem]"
									onClick={() =>
										history.push("/plans/payment-summary", {
											e: payGo,
											isType: "payGo",
										})
									}
								>
									<ExploreCard
										icon={<BsRocketTakeoff className=" text-bg_green" />}
										type={"Pay as You Go"}
										amount={payGo?.price}
										duration={"one off"}
										text={`Want to see how it works? 
            Pay to take a reading just once!`}
										color={"bg-gray_bg"}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ExplorePlans;
