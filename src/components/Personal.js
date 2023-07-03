import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import PlansCard from "./PlansCard";
import { BsPersonHeart } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { API_URL } from "./config";
import "./General.scss";

const Personal = () => {
	const [plans, setPlans] = useState();

	const { user, setIsLoading } = useContext(AuthContext);

	const cookies = new Cookies();

	const history = useHistory();

	useEffect(() => {
		if (!user) {
			history.push("/login");
		}

		const handleIndividual = async () => {
			setIsLoading(true);
			const res = await fetch(
				`${API_URL}/finance/subscription/individual/fee`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
					},
				}
			);

			const data = await res.json();

			console.log(data);

			setPlans(data);

			setIsLoading(false);
		};

		handleIndividual();
	}, []);

	const handleEvent = (e) => {
		history.push("/plans/payment-summary", {
			e,
			isType: "individual",
		});
	};

	return (
		<div className=" w-[70vw] mx-auto mt-[] relative max-xl:ml-[15rem] max-md:mx-auto max-md:w-[80vw] max-md:pb-[10rem]">
			<p className="medium fixed text-2xl z-[4] top-[2rem]">Individual Plans</p>
			<p className="text-xl medium pt-[10rem] text-center mb-[2rem]">
				Pick Your Best Plan
			</p>
			<div className=" grid grid-cols-2 justify-items-center items-center max-md:grid-cols-1 max-md:w-[70vw] max-md:mx-auto">
				{plans?.fees.map((e) => (
					<div className=" max-md:mb-[2rem]" key={e.id}>
						<PlansCard
							icon={<BsPersonHeart className=" text-primary" />}
							type={e.period_string}
							amount={e.price}
							text={e.description}
							event={() => handleEvent(e)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Personal;
