import React from "react";
import Buttons from "./Buttons";

const PlansCard = ({ icon, type, amount, text, event, discount }) => {
	return (
		<div>
			<div className=" bg-white px-[1rem] py-[2rem] w-[25rem] flex justify-between rounded-md shadow-lg items-center flex-col mx-auto text-center max-xl:w-[20rem] max-md:w-[70vw] max-sm:w-[80vw]">
				<div className=" h-[5rem] w-[5rem] rounded-full bg-light_blue flex items-center justify-center text-3xl">
					{icon}
				</div>
				<div className="">
					<h2 className=" mb-[1rem]">{type}</h2>
					<h1 className=" text-black text-lg mb-[1rem] line-through">
						<span
							dangerouslySetInnerHTML={{
								__html: discount,
							}}
						></span>
					</h1>
					<h1 className=" text-primary text-4xl mb-[1rem]">
						<span
							dangerouslySetInnerHTML={{
								__html: amount,
							}}
						></span>
					</h1>
					<p className=" text-lg mb-[1rem] w-[80%] mx-auto">{text}</p>
					<div className=" flex ">
						<Buttons
							text={"Choose Plan"}
							px={"px-[1rem] w-full"}
							color={"text-white"}
							bg={"bg-primary"}
							event={event}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlansCard;
