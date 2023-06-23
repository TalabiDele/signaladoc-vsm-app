import React, { useState } from "react";
import image from "assets/images/doc-img.png";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import "./General.scss";
import Buttons from "./Buttons";
import { toast } from "react-hot-toast";

const Chat = () => {
	const [isModal, setIsModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [isDisclaim, setIsDisclaim] = useState(false);

	const handleDisclaim = () => {
		if (check) {
			setIsDisclaim(false);
			setIsModal(true);
		} else {
			toast.error("Please check I understand!", {
				duration: 4000,
			});
		}
	};

	return (
		<div className=" w-[70%] mx-auto pt-[2rem] max-md:pt-[5rem] max-md:w-[90%]">
			{isModal && (
				<div className=" modal bg-black bg-opacity-90 fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
					<div className=" rounded-md bg-white py-[3rem] px-[1rem] w-[30rem] mx-auto relative text-center flex flex-col items-center max-md:w-[80%]">
						<h1
							className=" absolute right-[2rem] top-[1rem] cursor-pointer text-2xl"
							onClick={() => setIsModal(false)}
						>
							x
						</h1>

						<p className=" text-xl font-medium text-center">
							Click the button to chat with a general practitioner
						</p>
						<a href="https://wa.link/coox54">
							<button className=" bg-primary text-white border-2 border-primary rounded-md py-[0.5rem] px-[1rem] flex items-center mt-[2rem]">
								Chat on WhatsApp <BsWhatsapp className=" ml-[1rem]" />
							</button>
						</a>
					</div>
				</div>
			)}

			{isDisclaim && (
				<div className=" modal bg-black bg-opacity-90 fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
					<div className=" rounded-md bg-white py-[3rem] px-[1rem] w-[30rem] mx-auto relative text-center flex flex-col items-center max-md:w-[80%]">
						{/* <h1
							className=" absolute right-[2rem] top-[1rem] cursor-pointer text-2xl"
							onClick={() => setIsModal(false)}
						>
							x
						</h1> */}

						<p className="medium text-2xl mb-[1rem]">Disclaimer</p>

						<p className=" text-md font-medium text-center italic mb-[1rem]">
							The WhatsApp telemedicine options made available on this page are
							provided by licensed physicians/specialists practicing within a
							group of independently owned professional practices. The
							SignalADoc VSM App does not itself provide any physician, mental
							health or other healthcare provider services.
						</p>
						<div className=" flex items-center mb-[1rem]">
							<input
								type="checkbox"
								id="check"
								name="check"
								value={check}
								onChange={() => setCheck(!check)}
								className=" mr-[0.5rem]"
							/>
							<label htmlFor="check text-md medium">I understand</label>
						</div>

						<div className=" flex max-md:flex-col max-md:items-center">
							<Buttons
								text={"Close"}
								px={"px-[2rem] max-md:w-full mr-[1rem] max-md:mr-[0rem]"}
								border={"border-primary border-2 max-md:mb-[1rem]"}
								bg={"none"}
								color={"text-primary"}
								event={() => setIsDisclaim(false)}
							/>
							<Buttons
								text={"Continue"}
								px={"px-[3rem] max-md:w-full"}
								border={"border-primary border-2"}
								bg={"bg-primary"}
								color={"text-white"}
								event={() => handleDisclaim()}
							/>
						</div>
					</div>
				</div>
			)}

			<h1 className=" fixed z-[10] text-2xl">A Doctor in Your Pocket!</h1>

			<p className=" text-lg w-[30rem] mt-[2rem] max-md:w-full">
				Need to speak to a doctor about the results from your vital sign
				assessment? Let’s connect you to certified doctors.
			</p>

			<div
				className=" bg-light_blue mt-[2rem] w-[20rem] cursor-pointer max-md:w-[10rem]"
				onClick={() => setIsDisclaim(true)}
			>
				<img
					src={image}
					alt=""
					className=" rounded-tl-sm rounded-tr-sm w-full object-cover"
				/>
				<p className=" p-[1rem] text-xl font-Bold max-md:text-sm">
					Chat with a General Practitioner
				</p>
			</div>
		</div>
	);
};

export default Chat;
