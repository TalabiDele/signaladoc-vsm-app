import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/vsm-logo.png";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./General.scss";
import { BiHide, BiShow } from "react-icons/bi";

const CreateUser = () => {
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [refCode, setRefCode] = useState("");
	const [username, setUsername] = useState("");
	const [isOld, setIsOld] = useState(false);

	const {
		register,
		userId,
		isAgree,
		setIsAgree,
		type,
		setType,
		newsletter,
		setNewsletter,
		currentCntry,
	} = useContext(AuthContext);

	console.log(type);

	const handleRegister = (e) => {
		e.preventDefault();

		console.log(isAgree);

		if (firstname === "" || lastname === "" || password === "") {
			toast.error("Please fill required fields!", {
				duration: 6000,
			});
		} else if (!isAgree) {
			toast.error("Please agree to the terms and conditions!", {
				duration: 6000,
			});
		} else {
			register({
				firstname,
				lastname,
				username,
				password,
				refCode,
				userId,
				newsletter,
			});
		}
	};

	return (
		<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh] overflow-y-scroll pb-[5rem]">
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" w-[80%] mx-auto mt-[1rem] mb-[2rem]">
				<img src={logo} alt="" className=" w-[9rem] " />
			</div>
			<div className=" grid w-[80%] mx-auto">
				<h1 className=" font-bold text-3xl mb-[2rem] text-text_gray">
					Tell us a little about you
				</h1>

				<form action=" grid w-[90%]" onSubmit={handleRegister}>
					<div className=" mb-[1rem]">
						<label htmlFor="firstname" className=" text-text_gray">
							First Name
						</label>
						<input
							type="text"
							name="firstname"
							id="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							placeholder="John"
						/>
					</div>
					<div className=" mb-[1rem]">
						<label htmlFor="lastname" className=" text-text_gray">
							Last Name
						</label>
						<input
							type="text"
							name="lastname"
							id="lastname"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							placeholder="Doe"
						/>
					</div>
					<div className=" mb-[1rem]">
						<label
							htmlFor="username"
							className=" text-text_gray flex justify-between items-center"
						>
							{type === "email" ? "Phone Number" : "Email"}{" "}
							<span className=" text-sm">Optional</span>
						</label>
						{type === "email" ? (
							<PhoneInput
								defaultCountry={currentCntry}
								placeholder="Enter phone number"
								value={username}
								onChange={setUsername}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg bg-light_blue mt-[0.5rem]"
							/>
						) : (
							<input
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
								placeholder="johndoe@email.com"
							/>
						)}
					</div>
					<div className=" mb-[1rem]">
						<label htmlFor="paswword" className=" text-text_gray">
							Password
						</label>

						<div className="relative">
							<input
								type={isOld ? "text" : "password"}
								name="password"
								id="password"
								value={password}
								className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] w-full text-lg placeholder:text-7xl"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="******"
							/>
							<div className=" absolute top-[0.7rem] right-[0.5rem]">
								{isOld ? (
									<BiHide
										className=" text-xl"
										onClick={() => setIsOld(!isOld)}
									/>
								) : (
									<BiShow
										className=" text-xl"
										onClick={() => setIsOld(!isOld)}
									/>
								)}
							</div>
						</div>
					</div>
					<div className=" ">
						<label
							htmlFor="refCode"
							className=" text-text_gray flex justify-between items-center"
						>
							Referral Code <span className=" text-sm">Optional</span>
						</label>
						<input
							type="text"
							name="refCode"
							id="refCode"
							value={refCode}
							onChange={(e) => setRefCode(e.target.value)}
							className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							placeholder="123456"
						/>
					</div>

					<div class="flex items-center mb-4 mt-[2rem]">
						<input
							id="terms"
							type="checkbox"
							value={isAgree}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-input_border rounded focus:ring-blue-500 focus:ring-2"
							onChange={() => setIsAgree(!isAgree)}
						/>
						<label
							htmlFor="terms"
							class="ml-2 text-sm font-medium text-gray-900"
						>
							By signing up you accept our{" "}
							<a
								href="https://signaladoc.com/terms-and-conditions"
								className=" text-primary underline"
							>
								Terms Of Use
							</a>{" "}
							and{" "}
							<a
								href="https://signaladoc.com/privacy-policy"
								className=" text-primary underline"
							>
								Privacy Policy
							</a>
						</label>
					</div>

					<div class="flex items-center mb-4">
						<input
							id="subscribe"
							type="checkbox"
							value={newsletter}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-input_border rounded focus:ring-blue-500 focus:ring-2"
							onChange={() => setNewsletter(!newsletter)}
						/>
						<label
							htmlFor="subscribe"
							class="ml-2 text-sm font-medium text-gray-900"
						>
							Receive newsletters from SignalADoc VSM
						</label>
					</div>

					<button className=" bg-primary text-white border border-input_border py-[1rem] rounded-lg w-full">
						Create Account
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
