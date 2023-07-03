import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/vsm-logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_KEY } from "./config";
import jwt_decode from "jwt-decode";
import { BiHide, BiShow } from "react-icons/bi";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isNew, setIsNew] = useState(false);

	const { login, setIsLogin, googleLogin } = useContext(AuthContext);

	useEffect(() => {
		setIsLogin(false);
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();

		login({ email, password });
	};

	const handleGoogle = async (credentialResponse) => {
		console.log(credentialResponse);
		const obj = jwt_decode(credentialResponse.credential);

		console.log(obj);

		googleLogin({
			token: credentialResponse.credential,
			firstname: obj.given_name,
			surname: obj.family_name,
			photo: obj.picture,
			email: obj.email,
		});
	};

	return (
		<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh] overflow-y-scroll max-md:pb-[4rem] pb-[5rem]">
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" w-[80%] mx-auto mt-[1rem] mb-[2rem]">
				<img src={logo} alt="" className=" w-[9rem]" />
			</div>
			<div className=" grid w-[80%] mx-auto">
				<h1 className=" font-bold text-3xl mb-[0.2rem] text-text_gray">
					Welcome Back
				</h1>
				<p className=" mb-[2rem] text-text_gray text-lg">
					Log in to your account
				</p>

				<form action=" grid w-[90%]" onSubmit={handleLogin}>
					<div className=" mb-[1rem]">
						<label
							htmlFor="email"
							className=" text-text_gray mb-[0.5rem] text-sm "
						>
							Email address or phone number
						</label>
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							// placeholder="johndoe@email.com"
						/>
					</div>

					<div className=" mb-[1rem]">
						<label
							htmlFor="password"
							className=" text-text_gray mb-[0.5rem] text-sm"
						>
							Password
						</label>

						<div className="relative">
							<input
								type={isNew ? "text" : "password"}
								name="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
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

					<div className=" flex justify-between items-center mb-4">
						<div className="flex items-center">
							<input
								id="terms"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-input_border rounded focus:ring-blue-500 focus:ring-2"
							/>
							<label
								htmlFor="terms"
								className="ml-2 text-sm font-medium text-gray-900"
							>
								Remember me
							</label>
						</div>

						<Link to="/forgot-password" className=" text-sm">
							Forgot Password?
						</Link>
					</div>

					<button className=" bg-primary text-white border border-input_border py-[1rem] rounded-lg w-full">
						Login
					</button>
				</form>
				<h2 className=" text-center mb-[1rem]">OR</h2>

				{/* <button className=" border border-primary py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg">
          <FcGoogle className=" text-primary mr-[1rem]" /> Login with Google
        </button> */}

				<div className=" py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm">
					<GoogleOAuthProvider clientId={GOOGLE_KEY}>
						<GoogleLogin
							onSuccess={handleGoogle}
							onError={() => {
								console.log("Login Failed");
							}}
							useOneTap
						/>
					</GoogleOAuthProvider>
				</div>

				{/* <button className=" border border-black py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg">
          <FaApple className=" text-black mr-[1rem]" /> Login with Apple
        </button> */}

				<p className=" font-bold text-primary text-center text-md">
					Don't have an account?{" "}
					<Link to="/register" className=" underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signin;
