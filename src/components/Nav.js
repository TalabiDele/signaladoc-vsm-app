import React, { useState } from "react";
import logo from "../assets/images/vsm-logo.png";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const Nav = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className=" fixed shadow-sm top-0 right-0 left-0 z-[5] bg-white max-md:fixed max-md:right-0 mx-md:left-0 max-md:z-[5] max-md:w-[100vw] max-md:shadow-sm">
			<div className=" flex items-center justify-between w-[90%] mx-auto py-[1rem] max-md:my-[1rem] max-md:py-[0rem]">
				<img src={logo} alt="" className=" w-[12rem]" />

				<div
					className={`${
						!open ? " max-md:translate-x-[60rem]" : " max-md:translate-x-0"
					} flex justify-between w-[20rem] transition-all duration-100 ease-in-out max-md:flex-col max-md:bg-white max-md:shadow-lg max-md:h-[100vh] max-md:w-[100vw] max-md:fixed max-md:top-0 max-md:right-0 max-md:justify-normal max-md:pt-[10rem] max-md:px-[2rem] max-md:items-start`}
				>
					<a
						href="https://signaladoc.com/about-us"
						className=" hidden max-md:block pb-[0.5rem] border-b-2 border-b-input_border mb-[2rem]"
					>
						About SignalADoc
					</a>
					<a
						href="https://signaladoc.com/faqs"
						className=" hidden max-md:block pb-[0.5rem] border-b-2 border-b-input_border mb-[2rem]"
					>
						FAQs
					</a>
					<a
						href="https://signaladoc.com/privacy-policy"
						className=" hidden max-md:block pb-[0.5rem] border-b-2 border-b-input_border mb-[2rem]"
					>
						Privacy Policy
					</a>
					<a
						href="https://signaladoc.com/terms-and-conditions"
						className=" hidden max-md:block pb-[0.5rem] border-b-2 border-b-input_border mb-[2rem]"
					>
						Terms & Conditions
					</a>

					<Link
						to="/register"
						className=" max-md:w-full max-md:mx-auto max-md:mb-[2rem]"
					>
						<Buttons
							text={"Get Started"}
							px={"px-[3rem] max-md:w-full"}
							border={"border-primary border-2"}
							bg={"bg-primary"}
							color={"text-white"}
						/>
					</Link>
					<Link to="/login" className=" max-md:w-full max-md:mx-auto">
						<Buttons
							text={"Login"}
							px={"px-[2rem] max-md:w-full"}
							border={"border-primary border-2"}
							bg={"none"}
							color={"text-primary"}
						/>
					</Link>
				</div>

				<div
					className=" cursor-pointer relative hidden max-md:block z-[200]"
					onClick={() => setOpen(!open)}
				>
					<div
						className={` ${
							open && " rotate-45 mb-0"
						} bg-primary h-[3px] w-[35px] rounded-lg mb-[0.4rem] transition-all duration-100 ease-in-out`}
					></div>
					<div
						className={` ${
							open &&
							" -rotate-[45deg] mb-0 absolute top-0 transition-all duration-100 ease-in-out"
						} bg-primary h-[3px] w-[35px] rounded-lg mb-[0.4rem]`}
					></div>
					<div
						className={` ${
							open && "hidden"
						} bg-primary h-[3px] w-[35px] rounded-lg transition-all duration-100 ease-in-out`}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
