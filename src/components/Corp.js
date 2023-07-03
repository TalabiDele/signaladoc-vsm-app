import React from "react";
import { MdCorporateFare } from "react-icons/md";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const Corp = () => {
	return (
		<div className=" w-[70vw] mx-auto relative pt-[4rem] max-xl:ml-[20rem] max-lg:ml-[15rem] max-md:mx-[auto] max-sm:w-[90vw]">
			<p className="text-2xl medium fixed top-[2rem] z-[4] ">Corporate Plan</p>
			<div className="w-[30rem] max-md:w-full max-sm:w-[90vw] pt-[7rem]">
				<div className=" bg-light_blue rounded-md p-[1rem] mb-[2rem] ">
					<div className=" flex items-center mb-[2rem]">
						<div className=" h-[3rem] w-[3rem] rounded-full bg-white flex items-center justify-center text-3xl mr-[0.5rem]">
							<MdCorporateFare className=" text-brown" />
						</div>
						<p className="medium text-xl">Improve Employee Wellbeing</p>
					</div>

					<p className="text-gray">
						Six Individual Accounts Just what every team needs. Get your team
						onboard and keep them informed about their vital signs, so they can
						make better decisions about their wellbeing.
					</p>
				</div>

				<div className="grid grid-cols-2 justify-items-center max-md:grid-cols-1">
					<Link
						to="/plans/onboard"
						className=" max-md:w-full max-md:mx-auto max-md:mb-[2rem]"
					>
						<Buttons
							text={"Onboard my team"}
							px={"px-[3rem] max-md:w-full"}
							border={"border-primary border-2"}
							bg={"bg-primary"}
							color={"text-white"}
						/>
					</Link>
					<Link to="/plans/enrollee" className=" max-md:w-full max-md:mx-auto">
						<Buttons
							text={"I’m an enrollee"}
							px={"px-[3rem] max-md:w-full"}
							border={"border-primary border-2"}
							bg={"none"}
							color={"text-primary"}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Corp;
