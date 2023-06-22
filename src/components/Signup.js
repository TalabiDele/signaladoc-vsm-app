import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import Buttons from "./Buttons";
import { FcGoogle } from "react-icons/fc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaApple, FaLaughSquint } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import CodeModal from "./CodeModal";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/vsm-logo.png";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { GOOGLE_KEY } from "./config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import AppleLogin from "react-apple-login";

const Signup = () => {
	const [isEmail, setIsEmail] = useState(true);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [codes, setCodes] = useState(null);
	const [username, setUsername] = useState();
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [photo, setPhoto] = useState("");
	const [token, setToken] = useState("");

	const {
		validateEmail,
		isCode,
		setIsCode,
		message,
		type,
		setType,
		googleLogin,
	} = useContext(AuthContext);

	useEffect(() => {
		// getCountryCode();
		setType("email");
	}, []);

	const handleValidate = (e) => {
		e.preventDefault();

		console.log(type);

		if (username === "") {
			toast.error("Username field is required!", {
				duration: 6000,
			});
		} else {
			validateEmail({ username, type });
		}
	};

	const handleEmail = () => {
		setIsEmail(true);
		setUsername("");
		setType("email");
	};

	const handlePhone = () => {
		setIsEmail(false);

		setUsername("");

		setType("phone");
	};

	const handleLogin = async (credentialResponse) => {
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

	const handleApple = () => {
		<AppleLogin
			clientId="signaladoc@gmail.com"
			// redirectURI="https://redirectUrl.com"
		/>;
	};

	return (
		<div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh] pb-[5rem] overflow-y-scroll">
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" w-[80%] mx-auto mt-[1rem] mb-[2rem]">
				<img src={logo} alt="" className=" w-[9rem]" />
			</div>
			{isCode && <CodeModal contact={username} />}
			<div className=" grid w-[80%] mx-auto">
				<h1 className=" font-bold text-3xl mb-[0.2rem] text-text_gray">
					Get Started!
				</h1>
				<p className=" mb-[2rem] text-text_gray text-lg">
					Start your journey to a healthy lifestyle
				</p>

				<form action=" grid w-[90%]" onSubmit={handleValidate}>
					{isEmail ? (
						<div className=" mb-[1rem]">
							<label
								htmlFor="email"
								className=" text-text_gray mb-[0.5rem] text-sm"
							>
								Email address
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem]"
								placeholder="johndoe@email.com"
							/>
						</div>
					) : (
						<div className="">
							<label htmlFor="phone" className=" text-text_gray">
								Phone Number
							</label>
							<div className=" flex rounded-lg mt-[0.5rem] bg-white text-lg mb-[2rem]">
								<PhoneInput
									placeholder="Enter phone number"
									value={username}
									onChange={setUsername}
									className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg"
								/>
							</div>
						</div>
					)}
					<button className=" bg-primary text-white border border-primary py-[1rem] rounded-lg w-full">
						Continue
					</button>
				</form>

				<h2 className=" text-center mb-[1rem]">OR</h2>

				{isEmail ? (
					<button
						className=" border border-primary py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm"
						onClick={() => handlePhone()}
					>
						<BsFillTelephoneFill className=" text-primary mr-[1rem]" /> Signup
						with phone number
					</button>
				) : (
					<button
						className=" border border-primary py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm"
						onClick={() => handleEmail()}
					>
						<CiMail className=" text-primary mr-[1rem]" /> Signup with email
					</button>
				)}

				{/* <GoogleOAuthProvider clientId={GOOGLE_KEY}>
          <button
            className=" border border-primary py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm"
            onClick={() => login()}
          >
            <FcGoogle className=" text-primary mr-[1rem]" /> Signup with Google
          </button>
        </GoogleOAuthProvider> */}

				<div className=" py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm">
					<GoogleOAuthProvider clientId={GOOGLE_KEY}>
						<GoogleLogin
							onSuccess={handleLogin}
							onError={() => {
								console.log("Login Failed");
							}}
							useOneTap
						/>
					</GoogleOAuthProvider>
				</div>

				{/* <GoogleLogin
          clientId={GOOGLE_KEY}
          render={(renderProps) => (
            <button
              className=" border border-primary py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className=" text-primary mr-[1rem]" /> Signup with
              Google
            </button>
          )}
          buttonText="Signup with Google"
          onSuccess={responseGoogle}
          // onFailure={}
          cookiePolicy={"single_host_origin"}
        /> */}

				{/* <button
          className=" border border-black py-[0.5rem] rounded-lg flex justify-center items-center px-[2rem] mb-[1rem] text-lg max-sm:text-sm"
          onClick={() => handleApple()}
        > */}
				{/* <FaApple className=" text-black mr-[1rem]" /> Signup with Apple */}
				{/* <AppleLogin
            clientId="6YQ38332LY"
            redirectURI="https://redirectUrl.com"
          /> */}
				{/* </button> */}

				<p className=" font-bold text-primary text-center text-md">
					Aready have an account?{" "}
					<Link to="/login" className=" underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
