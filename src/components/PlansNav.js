import React from "react";
import { Link, useParams } from "react-router-dom";

const PlansNav = () => {
	const pathname = window.location.pathname;

	let { slug } = useParams();

	return (
		<div
			className={` ${pathname === "/plans/individual" && "hidden"} ${
				pathname === "/plans/corporate" && "hidden"
			} ${pathname === "/plans/onboard" && "hidden"} ${
				pathname === "/plans/enrollee" && "hidden"
			} ${pathname === `/plans/discounts/${slug}` && "hidden"} ${
				pathname === `/plans/payment-summary` && "hidden"
			} w-[100vw] pt-[7rem] max-md:w-[90vw] max-md:mx-auto max-md:overflow-x-auto max-sm:w-[95vw] no-scrollbar`}
		>
			<div className=" w-[50vw] mx-[auto] flex items-center justify-between max-md:w-[95vw] max-sm:w-[100vw] max-md:overflow-x-auto">
				<Link
					to="/plans"
					className={` ${
						pathname === "/plans" && "bg-primary text-white"
					} bg-gray_bg text-black py-[0.5rem] px-[1rem] max-md:px-[0.5rem] text-sm max-sm:text-[12px] rounded-md`}
				>
					My Plans
				</Link>
				<Link
					to="/plans/explore"
					className={` ${
						pathname === "/plans/explore" && "bg-primary text-white"
					} bg-gray_bg text-black py-[0.5rem] px-[1rem] max-md:px-[0.5rem] text-sm max-sm:text-[12px] rounded-md`}
				>
					Explore plans
				</Link>
				<Link
					to="/plans/discounts"
					className={` ${
						pathname === "/plans/discounts" && "bg-primary text-white"
					} bg-gray_bg text-black py-[0.5rem] px-[1rem] max-md:px-[0.5rem] text-sm max-sm:text-[12px] rounded-md`}
				>
					Discounts
				</Link>
				<Link
					to="/plans/history"
					className={` ${
						pathname === "/plans/history" && "bg-primary text-white"
					} bg-gray_bg text-black py-[0.5rem] px-[1rem] max-md:px-[0.5rem] text-sm max-sm:text-[12px] rounded-md`}
				>
					Transaction history
				</Link>
			</div>
		</div>
	);
};

export default PlansNav;
