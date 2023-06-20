import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/vsm-logo.png";
import ResetCode from "./ResetCode";
import PasswordChange from "./PasswordChange";
import { Redirect } from "react-router-dom";

const Forgot = () => {
	const [username, setUsername] = useState("");

	const {
		isReset,
		setIsReset,
		forgotPassword,
		isChange,
		setIsChange,
		isLogin,
	} = useContext(AuthContext);

	const handleForgot = (e) => {
		e.preventDefault();

		if (username === "") {
			toast.error("Email or phone number required", {
				duration: 6000,
			});
		} else {
			forgotPassword({ username });
		}
	};

	return (
		<div>
			<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh]">
				<Toaster position="top-center" reverseOrder={false} />
				<div className=" w-[80%] mx-auto mt-[3rem] mb-[2rem]">
					<img src={logo} alt="" className=" w-[12rem]" />
				</div>
				{isReset && <ResetCode />}
				{isChange && <PasswordChange />}
				{isLogin && <Redirect to="/login" />}
				<div className=" grid w-[80%] mx-auto">
					<h1 className=" font-bold text-2xl mb-[0.5rem] text-text_gray">
						Forgot Password
					</h1>
					<p className=" mb-[1rem] text-text_gray">
						Enter your email or phone number to reset your password
					</p>

					<form action=" grid w-[90%]" onSubmit={handleForgot}>
						<div className=" mb-[1rem]">
							<label htmlFor="email" className=" text-text_gray mb-[0.5rem]">
								Email address
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[1rem]"
								placeholder="johndoe@email.com"
							/>
						</div>
						<button className=" bg-primary text-white border border-primary py-[1rem] rounded-lg w-full">
							Reset Password
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Forgot;
