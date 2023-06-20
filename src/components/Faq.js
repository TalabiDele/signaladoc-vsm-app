import React, { useState } from "react";
import image from "../assets/images/faq.png";
import { TiPlus, TiMinus } from "react-icons/ti";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const Faq = () => {
	const [isOne, setIsOne] = useState(false);
	const [isTwo, setIsTwo] = useState(false);
	const [isThree, setIsThree] = useState(false);
	const [isFour, setIsFour] = useState(false);
	const [isFive, setIsFive] = useState(false);
	const [isSix, setIsSix] = useState(false);
	const [isSeven, setIsSeven] = useState(false);

	const handleOne = () => {
		setIsOne(!isOne);

		setIsTwo(false);
		setIsThree(false);
		setIsFour(false);
		setIsFive(false);
		setIsSix(false);
		setIsSeven(false);
	};

	const handleTwo = () => {
		setIsTwo(!isTwo);

		setIsOne(false);
		setIsThree(false);
		setIsFour(false);
		setIsFive(false);
		setIsSix(false);
		setIsSeven(false);
	};

	const handleThree = () => {
		setIsThree(!isThree);

		setIsOne(false);
		setIsTwo(false);
		setIsFour(false);
		setIsFive(false);
		setIsSix(false);
		setIsSeven(false);
	};

	const handleFour = () => {
		setIsFour(!isFour);

		setIsOne(false);
		setIsTwo(false);
		setIsThree(false);
		setIsFive(false);
		setIsSix(false);
		setIsSeven(false);
	};

	const handleFive = () => {
		setIsFive(!isFive);

		setIsOne(false);
		setIsTwo(false);
		setIsThree(false);
		setIsFour(false);
		setIsSix(false);
		setIsSeven(false);
	};

	const handleSix = () => {
		setIsSix(!isSix);

		setIsOne(false);
		setIsTwo(false);
		setIsThree(false);
		setIsFour(false);
		setIsFive(false);
		setIsSeven(false);
	};

	return (
		<div className=" bg-white py-[5rem]">
			<h1 className="text-4xl text-center mb-[3rem]">
				Frequently Asked Questions
			</h1>
			<div className=" flex w-[90%] mx-auto items-start justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col max-lg:items-center">
				<img
					src={image}
					alt=""
					className=" max-sm:mb-[2rem] mb-[2rem] max-2xl:w-[25rem]"
				/>

				<div className=" text-text_gray w-[50rem] max-sm:w-[20rem] max-sm:mx-auto max-md:w-[35rem] max-md:mx-auto max-lg:w-[40rem] max-lg:mx-auto max-2xl:w-[40rem] text-center">
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem] `}
						onClick={() => handleOne()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								How does the VSM App extract vitals from an individual's face?
							</h2>
							{isOne ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleOne()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleOne()}
								/>
							)}
						</div>
						{isOne && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								SignalADoc VSM employs the rPPG (remote photoplethysmography)
								technology for its facial readings. This technology uses an
								optical sensor to detect variations in blood flow at a distance.
								Without making direct touch with the skin, rPPG algorithms
								determine heart rate, blood pressure, and other vital signs by
								examining the minute variations in skin color brought on by
								changes in blood flow. In this case, a camera or optical sensor
								is pointed at someone's face from a distance in order to employ
								rPPG to extract health information from their face.
							</p>
						)}
					</div>
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem] `}
						onClick={() => handleTwo()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								What vital signs does the VSM App extract from a facial reading?
							</h2>
							{isTwo ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleTwo()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleTwo()}
								/>
							)}
						</div>
						{isTwo && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								The SignalADoc VSM App uses remote photoplethysmography (rPPG)
								technology and sophisticated algorithms to extract vital signs
								ranging from blood pressure, heart rate variability (HRV),
								oxygen saturation (SpO2), respiratory rate, and mental stress
								levels.
							</p>
						)}
					</div>
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem]`}
						onClick={() => handleThree()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								Using the VSM App, can I take a reading from anywhere and at any
								time?
							</h2>
							{isThree ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleThree()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleThree()}
								/>
							)}
						</div>
						{isThree && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								Yes sure, you can. The VSM App allows you to conveniently track
								your vital signs from anywhere, at any time.
							</p>
						)}
					</div>
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem]`}
						onClick={() => handleFour()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								What devices does the VSM App support?
							</h2>
							{isFour ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleFour()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleFour()}
								/>
							)}
						</div>
						{isFour && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								Our technology relies on cameras to do remote
								photoplethysmography (rPPG) measurements and also to collect
								important health information. This remote health data is
								collected via devices with cameras, like smartphones, tablets
								and laptops. To make sure that both individuals and healthcare
								brands can use our technology, we continue to place a high
								priority on easy compatibility with camera-equipped devices.
							</p>
						)}
					</div>
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem]`}
						onClick={() => handleFive()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								Do you provide treatment recommendations after a vital sign
								result is obtained?
							</h2>
							{isOne ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleFive()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleFive()}
								/>
							)}
						</div>
						{isFive && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								We do not offer treatments or treatment recommendations. No
								diseases or medical issues are meant to be diagnosed, treated,
								prevented, or cured using the VSM App. Instead, our technology
								provides information solely on wellness purposes. To analyze and
								take action on the health data that our technology provides, we
								recommend that users consult with certified doctors and
								healthcare practitioners before taking any decision or action.
							</p>
						)}
					</div>
					<div
						className={` bg-white shadow-lg rounded-lg p-[1rem] transition-all duration-100 ease-in-out mb-[1rem]`}
						onClick={() => handleSix()}
					>
						<div className=" flex items-center justify-between">
							<h2 className=" font-semibold text-xl max-sm:text-lg cursor-pointer mb-[0.5rem] max-sm:w-[90%] max-sm:max-auto text-center">
								What are the other benefits of using the SignalADoc VSM App?
							</h2>
							{isSix ? (
								<TiMinus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleSix()}
								/>
							) : (
								<TiPlus
									className=" text-primary text-xl font-bold cursor-pointer"
									onClick={() => handleSix()}
								/>
							)}
						</div>
						{isSix && (
							<p className=" text-lg w-[90%] max-sm:text-sm max-2xl:text-sm text-center mx-auto">
								You can also gain access to amazing and relatable health
								insights and articles that help you stay informed on how to stay
								healthy. The VSM App also helps you build healthy habits to keep
								you on track. We continue to put in the work to release
								innovative features that will help individuals consistently
								build and live healthy.
							</p>
						)}
					</div>
				</div>
			</div>

			<Link to={"/register"} className=" flex justify-center mt-[2rem]">
				<Buttons
					text={"Get Started"}
					px={"px-[4rem]"}
					bg={"bg-primary text-white"}
				/>
			</Link>
		</div>
	);
};

export default Faq;
