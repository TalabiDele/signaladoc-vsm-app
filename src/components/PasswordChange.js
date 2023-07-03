import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { toast } from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";

const PasswordChange = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isNew, setIsNew] = useState(false);
	const [isOld, setIsOld] = useState(false);

	const { resetPassword, userId } = useContext(AuthContext);

	const handleResetPassword = (e) => {
		e.preventDefault();

		if (password === "") {
			toast.error("All fields are required!", {
				duration: 6000,
			});
		} else if (password !== confirmPassword) {
			toast.error("Passwords do not match!", {
				duration: 6000,
			});
		} else {
			resetPassword({ userId, password });
		}
	};

	return (
		<div>
			<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh]">
				<div className=" grid w-[80%] mx-auto">
					<h1 className=" font-bold text-2xl mb-[0.5rem] text-text_gray">
						Reset Password
					</h1>
					<p className=" mb-[3rem] text-text_gray">
						Enter your new preferred password
					</p>

					<form action=" grid w-[90%]" onSubmit={handleResetPassword}>
						<div className=" mb-[1rem]">
							<label htmlFor="password" className=" text-text_gray mb-[0.2rem]">
								Password
							</label>

							<div className="relative">
								<input
									type={isOld ? "text" : "password"}
									name="password"
									id="password"
									value={password}
									className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[1rem] w-full text-lg placeholder:text-7xl"
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
						<div className=" mb-[1rem]">
							<label
								htmlFor="confirmPassword"
								className=" text-text_gray mb-[0.2rem]"
							>
								Confirm Password
							</label>

							<div className="relative">
								<input
									type={isNew ? "text" : "password"}
									name="confirmPassword"
									id="confirmPassword"
									value={confirmPassword}
									className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								<div className="absolute top-[0.7rem] right-[0.5rem]">
									{isNew ? (
										<BiHide
											className=" text-xl"
											onClick={() => setIsNew(!isNew)}
										/>
									) : (
										<BiShow
											className=" text-xl"
											onClick={() => setIsNew(!isNew)}
										/>
									)}
								</div>
							</div>
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

export default PasswordChange;
