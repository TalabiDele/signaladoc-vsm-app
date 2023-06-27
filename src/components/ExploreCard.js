import React from "react";

const ExploreCard = ({ icon, type, text, color, amount, duration, price }) => {
	return (
		<div>
			<div
				className={` ${color} p-[1rem] w-[25rem] flex justify-between rounded-md shadow-lg items-center mx-auto cursor-pointer`}
			>
				<div className=" h-[4rem] w-[4rem] rounded-full bg-white flex items-center justify-center text-3xl">
					{icon}
				</div>
				<div className=" w-[80%] mx-auto">
					<h2 className=" mb-[0.5rem] text-xl">{type}</h2>
					{amount && (
						<h1 className=" text-primary text-4xl mb-[0.5rem]">
							₦{amount}/<span className=" text-sm mb-[1rem]">{duration}</span>
						</h1>
					)}
					<p className=" text-md mb-[1rem]">
						{text}{" "}
						{price && <span className=" font-bold text-primary">₦{price}</span>}
					</p>
					<div className=" flex "></div>
				</div>
			</div>
		</div>
	);
};

export default ExploreCard;
