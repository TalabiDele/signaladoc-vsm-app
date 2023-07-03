import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import PlansCard from "./PlansCard";
import { BsPersonHeart } from "react-icons/bs";

const Bank = () => {
	const [plans, setPlans] = useState();

	const cookies = new Cookies();

	let { slug } = useParams();

	const history = useHistory();

	console.log(slug);

	useEffect(() => {
		const handlePlans = async () => {
			const res = await fetch(
				`${API_URL}/finance/discount/bank/plan?bank_id=${slug}`,
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

			setPlans(data.plans);
		};

		handlePlans();
	}, []);

	const handleEvent = (e) => {
		history.push("/plans/payment-summary", {
			e,
			isType: "individual",
			isDiscount: true,
		});
	};

	return (
		<div className=" w-[70vw] mx-auto mt-[] relative max-xl:ml-[15rem] max-md:mx-auto max-md:w-[80vw] max-md:pb-[10rem]">
			<p className="medium fixed text-2xl z-[4] top-[2rem]">Choose a Plan</p>
			<p className="text-xl medium pt-[5rem] text-center mb-[2rem]">
				Pick Your Best Plan
			</p>
			<div className=" grid grid-cols-2 justify-items-center items-center max-md:grid-cols-1 max-md:w-[70vw] max-md:mx-auto">
				{plans?.map((e) => (
					<div className=" max-md:mb-[2rem]" key={e.id}>
						<PlansCard
							icon={<BsPersonHeart className=" text-primary" />}
							type={e.period_string}
							amount={e.discount_amount_formatted}
							text={e.plan.description}
							event={() => handleEvent(e)}
							discount={e.plan.price}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Bank;
