import React from "react";
import Buttons from "./Buttons";
import { Link, useHistory } from "react-router-dom";

const ActivePlan = ({
	icon,
	type,
	amount,
	duration,
	date,
	isButton,
	payGo,
	readings,
	payGoData,
	discount,
	loading,
}) => {
	const history = useHistory();

	return (
		<>
			{!amount ? (
				<div></div>
			) : (
				<div className=" w-[50vw] mx-auto max-md:w-[80vw]">
					<div
						className={` ${
							isButton
								? "w-[30rem] max-md:w-[20rem] max-md:mx-auto"
								: "w-[20rem]"
						} bg-light_blue p-[1rem]  flex rounded-md shadow-lg items-center`}
					>
						<div className=" h-[4rem] w-[4rem] rounded-full bg-white flex items-center justify-center text-3xl mr-[1rem]">
							{icon}
						</div>
						<div className="">
							<h2 className=" mb-[0.5rem]">{type}</h2>
							<h1 className=" text-black text-lg mb-[1rem] line-through">
								<span
									dangerouslySetInnerHTML={{
										__html: discount,
									}}
								></span>
							</h1>
							<h1 className=" text-primary text-4xl mb-[0.5rem] max-md:text-xl">
								<span
									dangerouslySetInnerHTML={{
										__html: amount,
									}}
								></span>
								{duration && (
									<span className=" text-sm mb-[0.5rem]">/{duration}</span>
								)}
							</h1>
							<p className=" text-sm mb-[0.5rem]">
								{isButton && !payGo && "Auto renewal:"} {date}
							</p>
							{isButton && !payGo && (
								<div className=" flex max-md:flex-col items-center">
									<Buttons
										text={"Change subscription"}
										px={"px-[1rem]"}
										color={"text-white"}
										bg={"bg-primary"}
									/>
									<Buttons
										text={"Cancel subscription"}
										px={"px-[1rem]"}
										color={"text-text_gray"}
										bg={"none"}
									/>
								</div>
							)}

							{isButton && payGo && (
								<Link to="/capture">
									<Buttons
										text={"Take a reading"}
										px={"px-[1rem]"}
										color={"text-white"}
										bg={"bg-primary"}
									/>
								</Link>
							)}

							{readings === 0 && (
								<div className=" flex max-md:flex-col items-center">
									<Link to="/plans/explore">
										<Buttons
											text={"Upgrade my plan"}
											px={"px-[1rem]"}
											color={"text-white"}
											bg={"bg-primary"}
										/>
									</Link>
									<div
										className=""
										onClick={() =>
											history.push("/plans/payment-summary", {
												e: payGoData,
											})
										}
									>
										<Buttons
											text={"Pay one-time"}
											px={"px-[1rem]"}
											color={"text-text_gray"}
											bg={"none"}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ActivePlan;
