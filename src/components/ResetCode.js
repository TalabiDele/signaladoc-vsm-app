import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import logo from "../assets/images/vsm-logo.png";
import toast, { Toaster } from "react-hot-toast";
import PasswordChange from "./PasswordChange";
import Modal from "./Modal";
import { BsFillPatchCheckFill } from "react-icons/bs";

const ResetCode = () => {
	const [code, setCode] = useState("");

	const {
		isChange,
		setIsChange,
		resetPassword,
		userId,
		emailCode,
		setIsReset,
		isModal,
		setIsModal,
		isCode,
		setIsCode,
		resendForgotCode,
	} = useContext(AuthContext);

	const handleReset = (e) => {
		e.preventDefault();
		const toastLoading = toast.loading("Loading...");

		if (code === "") {
			setTimeout(() => {
				toast.dismiss(toastLoading);
				toast.error("Enter the reset code sent to your email!", {
					duration: 6000,
				});
			}, 6000);
		} else if (code !== emailCode) {
			setTimeout(() => {
				toast.dismiss(toastLoading);
				toast.error("Code incorrect, try again!", {
					duration: 6000,
				});
			}, 6000);
		} else {
			setTimeout(() => {
				toast.dismiss(toastLoading);
				// toast.success("Email verified!", {
				//   duration: 6000,
				// });
				setIsCode(true);
				setIsModal(true);
				setIsReset(false);
				setIsChange(true);
			}, 6000);
		}
	};

	const handleResend = () => {
		resendForgotCode({ userId });
	};

	return (
		<div>
			<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh]">
				<div className=" grid w-[80%] mx-auto">
					<h1 className=" font-bold text-2xl mb-[0.5rem] text-text_gray">
						Reset Password
					</h1>
					<p className=" mb-[1rem] text-text_gray">
						Enter the password reset code sent to your email or phone number
					</p>

					<form action=" grid w-[90%]" onSubmit={handleReset}>
						<div className=" mb-[1rem]">
							<label htmlFor="code" className=" text-text_gray mb-[0.5rem]">
								Password reset code
							</label>
							<input
								type="number"
								name="code"
								id="code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem]"
								placeholder="123456"
							/>
						</div>
						<button className=" bg-primary text-white border border-primary py-[1rem] rounded-lg w-full">
							Submit
						</button>

						<p className=" italic text-md mt-[1rem]">
							Didn’t receive it?{" "}
							<span
								className=" underline cursor-pointer italic"
								onClick={() => handleResend()}
							>
								Resend
							</span>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetCode;
