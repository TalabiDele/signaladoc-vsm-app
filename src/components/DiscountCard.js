import React from "react";

const DiscountCard = ({ logo, text }) => {
	return (
		<div>
			<div className=" shadow-md w-[20rem] rounded-md mx-auto text-center p-[1rem] grid justify-items-center max-md:bg-light_blue max-md:shadow-none max-md:w-[10rem]">
				<img
					src={logo}
					alt=""
					className=" w-[8rem] h-[4rem] object-contain mb-[1rem]"
				/>
				<p className=" w-[80%] max-md:text-sm">{text}</p>
			</div>
		</div>
	);
};

export default DiscountCard;
