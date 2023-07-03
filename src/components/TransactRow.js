import React from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import "./General.scss";

const TransactRow = ({ type, date, refe, amount, status }) => {
	return (
		<div>
			<div className=" flex items-center justify-between p-[2rem] border-b border-b-input_border w-[80vw] max-md:flex-col max-md:items-start max-md:mx-auto mb-[2rem] max-xl:w-[70vw] max-xl:mx-auto max-xl:ml-[5rem] max-xl:p-[1rem] max-xl:flex-col max-xl:items-start max-md:w-[90vw]">
				<div className="flex items-center justify-between w-[18vw] max-md:w-[17rem] max-md:mb-[1rem] max-xl:w-[17rem] max-xl:mb-[1rem] max-2xl:w-[20rem]">
					<div className="bg-light_blue h-[4rem] w-[4rem] rounded-full flex items-center justify-center ">
						<BsFillCreditCard2FrontFill className=" text-bg_green text-4xl" />
					</div>
					<p className=" medium text-xl max-xl:text-lg">{type}</p>
				</div>
				<div className="flex justify-between w-[55rem] items-center max-md:items-center max-2xl:w-[45rem] max-md:w-[20rem]">
					<div className="flex w-[20vw] items-center justify-between max-md:flex-col max-md:items-start max-md:w-[50vw] max-xl:flex-col max-xl:items-start max-md:text-sm max-2xl:w-[50%] mx-[2rem]">
						<p className="">{date}</p>
						<p className="">Ref: {refe}</p>
					</div>
					<div className="flex items-center justify-between w-[25vw] max-md:flex-col max-md:items-end max-xl:flex-col max-xl:items-end">
						<p className=" bold text-3xl text-primary max-md:text-lg max-xl:text-xl">
							<span
								dangerouslySetInnerHTML={{
									__html: amount,
								}}
							></span>
						</p>
						<p className=" text-bg_green">{status}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactRow;
