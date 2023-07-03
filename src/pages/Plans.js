import ActivePlan from "components/ActivePlan";
import NoPlans from "components/NoPlans";
import PlansNav from "components/PlansNav";
import React, { useEffect, useContext, useState } from "react";
import { BsPersonHeart } from "react-icons/bs";
import AuthContext from "components/context/AuthContext";
import { useHistory } from "react-router-dom";
import { API_URL } from "components/config";
import Cookies from "universal-cookie";
import LoaderComponent from "components/LoaderComponent";

const Plans = () => {
	const { user, lowest, setLowest, isLoading, setIsLoading } =
		useContext(AuthContext);
	const [activeSub, setActiveSub] = useState(null);

	const history = useHistory();

	const cookies = new Cookies();

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}

		const handleActiveSub = async () => {
			setIsLoading(true);
			const res = await fetch(`${API_URL}/finance`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			setLowest(data.lowest_individual);

			setActiveSub(data);

			setIsLoading(false);
		};

		handleActiveSub();
	}, []);

	return (
		<div className=" w-[70vw] mx-auto relative">
			<p className="medium fixed text-2xl z-[4] top-[2rem] max-md:left-[3rem] w-[70vw] mx-auto left-[15rem]">
				My Plans
			</p>
			{isLoading ? (
				<LoaderComponent />
			) : user?.active_subscription ? (
				<div className=" mt-[2rem]">
					<ActivePlan
						icon={<BsPersonHeart className=" text-primary" />}
						type={activeSub?.user_plan.label}
						duration={activeSub?.user_plan.data.period_string}
						amount={
							activeSub?.user_plan.data.fee
								? activeSub?.user_plan.data.fee.amount_formatted
								: activeSub?.lowest_individual
						}
						date={
							activeSub?.user_plan.data.ended_at
								? activeSub?.user_plan.data.ended_at
								: `You have ${activeSub?.user_plan.data.readings_left} reading attempt`
						}
						isButton={true}
						payGo={activeSub?.lowest_individual ? true : false}
						loading={isLoading}
					/>
				</div>
			) : (
				<NoPlans />
			)}
		</div>
	);
};

export default Plans;
