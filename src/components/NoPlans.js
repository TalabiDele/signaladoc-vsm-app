import React from "react";
import Buttons from "./Buttons";
import image from "assets/images/not-found.png";
import { Link } from "react-router-dom";

const NoPlans = () => {
	return (
		<div className=" w-[50vw] mx-auto pt-[4rem]">
			<div className=" text-center flex flex-col justify-between h-[60vh] items-center pb-[10rem]">
				<p className=" text-xl">You do not have an active subscription!</p>
				<img src={image} alt="" className=" w-[25rem]" />
				<Link to="/plans/explore">
					<Buttons
						text={"Pick a Plan"}
						bg={"bg-primary"}
						px={"px-[6rem] max-md:px-[1rem]"}
						color={"text-white"}
					/>
				</Link>
			</div>
		</div>
	);
};

export default NoPlans;
