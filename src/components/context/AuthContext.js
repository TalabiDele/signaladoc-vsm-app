import { createContext, useState, useEffect, useRef } from "react";
import { API_URL } from "../config";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import useRPPG from "hooks/useRPPG";
import useFaceMesh from "hooks/useFaceMesh";
import { FaLastfmSquare } from "react-icons/fa";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [stepOne, setStepOne] = useState(true);
	const [stepTwo, setStepTwo] = useState(false);
	const [stepThree, setStepThree] = useState(false);
	const [isEmail, setIsEmail] = useState(true);
	const [isCode, setIsCode] = useState(false);
	const [isDetails, setIsDetails] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [emailCode, setEmailCode] = useState(null);
	const [userId, setUserId] = useState(null);
	const [approved, setApproved] = useState(false);
	const [isPlan, setIsPlan] = useState(false);
	const [token, setToken] = useState("");
	const [plans, setPlans] = useState();
	const [isCheckout, setIsCheckout] = useState(false);
	const [user, setUser] = useState(null);
	const [discountId, setDiscountId] = useState();
	const [showBg, setShowBg] = useState(true);
	const [ref, setRef] = useState();
	const [isSuccess, setIsSuccess] = useState(false);
	const [username, setUsername] = useState("");
	const [isForgot, setIsForgot] = useState(false);
	const [isReset, setIsReset] = useState(false);
	const [isCodeReset, setIsCodeReset] = useState(false);
	const [isPaid, setIsPaid] = useState(false);
	const [type, setType] = useState("");
	const [isChange, setIsChange] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [isAgree, setIsAgree] = useState(false);
	const [newsletter, setNewsletter] = useState(false);
	const [profData, setProfData] = useState();
	const [medData, setMedData] = useState();
	const [canCapture, setCanCapture] = useState();
	const [resultReading, setResultReading] = useState();
	const [chartData, setChartData] = useState();
	const [vitals, setVitals] = useState();
	const videoElement = useRef < HTMLVideoElement > null;
	const canvasElement = useRef < HTMLCanvasElement > null;
	const [isModal, setIsModal] = useState(false);
	const [isResetPass, setIsResetPass] = useState(false);

	const history = useHistory();
	const cookies = new Cookies();

	const processingFaceMesh = useRef(false);

	const stopHandler = () => {
		stop();

		// closeCamera();
		// cameraInstance?.stop();
	};

	const onCalculationEndedCb = () => {
		stopHandler();
		closeCamera();
		cameraInstance?.stop();
	};

	const { stop, closeCamera } = useRPPG({
		videoElement,
		// onUnsupportedDeviceCb,
		onAllDataCalculatedCb: onCalculationEndedCb,
		onCalculationEndedCb,
	});

	const { cameraInstance } = useFaceMesh({
		videoElement,
		canvasElement,
		processing: processingFaceMesh,
	});

	const pathname = window.location.pathname;

	useEffect(() => {
		checkUserLoggedIn();

		if (pathname !== "/capture") {
			// onCalculationEndedCb();
			// console.log(pathname);
		}
		const handleInit = async () => {
			const res = await fetch(`${API_URL}/vital-sign/init`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			setCanCapture(data?.can_capture);

			// setProfData(data.profile);
			// setMedData(data.user_info);

			console.log(medData);
		};

		const handleProfile = async () => {
			const res = await fetch(`${API_URL}/user/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			// setCanCapture(data.can_capture);

			setProfData(data.profile);
			setMedData(data.medical_info);

			console.log(profData);
		};

		handleProfile();
		handleInit();
	}, []);

	useEffect(() => {
		const handleHome = async () => {
			const res = await fetch(`${API_URL}/home`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			setChartData(data.chart_data);
			setVitals(data.vital_signs);

			console.log(chartData);

			console.log(data);
		};

		handleHome();
	}, []);

	const logout = () => {
		cookies.remove("vsm_authorization", "", {
			expires: new Date(0),
		});
		history.push("/login");

		setUser(null);

		setChartData(null);
		setVitals(null);

		setProfData(null);
		setMedData(null);
	};

	const validateEmail = async ({ username, type }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/registration/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, type }),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			setApproved(true);
			setMessage(data.message);
			toast.success(data.message, {
				duration: 6000,
			});
			setUserExists(false);
			setTimeout(() => {
				setApproved(false);
				setMessage("");
			}, 6000);

			setEmailCode(data.data.code);

			setUserId(data.data.id);
			setType(data.data.type_string);
			setIsCode(true);

			//   setIsDetails(true);
		} else {
			setError(true);

			setMessage(data.username[0]);

			toast.error(data.username[0], {
				duration: 6000,
			});

			setTimeout(() => {
				setMessage("");
			}, 3000);
		}

		setTimeout(() => {
			setError(false);
		}, 3000);

		setLoading(false);
		toast.dismiss(toastLoading);
	};

	const checkUserLoggedIn = async () => {
		// const obj = jwt_decode(cookies.get("vsm_authorization"));
		const res = await fetch(`${API_URL}/user/detail`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
		});

		const data = await res.json();

		setUser(data.detail);

		setToken(cookies.get("vsm_authorization"));

		// if (data) {
		//   history.push("/home");
		// } else {
		//   history.push("/login");
		// }
	};

	const register = async ({
		firstname,
		lastname,
		password,
		userId,
		username,
		refCode,
		newsletter,
	}) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/registration/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				registration_id: userId,
				first_name: firstname,
				surname: lastname,
				password,
				username: username,
				referral_code: refCode,
				registration_type: type,
				newsletter: newsletter,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			setUser(data.user);

			console.log(user);
			setApproved(true);
			setMessage("Account created successfully!");
			toast.success("Account created successfully!");
			setIsPlan(true);
			setUser(data.user);
			setStepTwo(true);
			setToken(data.access_token);

			// const decoded = jwt(data.access_token);

			// console.log(data.access_token);

			// cookies.set("vsm_authorization", data.access_token, {
			// 	expires: new Date(decoded.exp * 1000),
			// });

			// checkUserLoggedIn();

			history.push("/login");

			setTimeout(() => {
				setApproved(false);
				setMessage("");
			}, 4000);
		} else {
			if (data.first_name && data.surname && data.password) {
				setMessage(`All fields are required!`);
				toast.error("All fields are required!", {
					duration: 6000,
				});
			} else if (data.first_name && data.surname) {
				setMessage("The first name & surname fields are required!");
				toast.error("The first name & surname fields are required!", {
					duration: 6000,
				});
			} else if (data.first_name && data.password) {
				setMessage("The first name & password fields are required!");
				toast.error("The first name & password fields are required!", {
					duration: 6000,
				});
			} else if (data.surname && data.password) {
				setMessage("The surname & password fields are required!");
				toast.error("The surname & password fields are required!", {
					duration: 6000,
				});
			} else if (data.surname) {
				setMessage(`${data.surname[0]}`);
				toast.error(`${data.surname[0]}`, {
					duration: 6000,
				});
			} else if (data.password) {
				setMessage(`${data.password[0]}`);
				toast.error(`${data.password[0]}`, {
					duration: 6000,
				});
			} else if (data.first_name) {
				setMessage(`${data.surname[0]}`);
				toast.error(`${data.surname[0]}`, {
					duration: 6000,
				});
			} else if (!isAgree) {
				toast.error("Please agree to the terms and conditions!", {
					duration: 6000,
				});
			}

			setError(true);

			setTimeout(() => {
				setError(false);
				setMessage("");
			}, 4000);
		}

		setLoading(false);
		toast.dismiss(toastLoading);
	};

	const login = async ({ email, password }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: email, password }),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			setApproved(true);
			setUser(data.user);
			const decoded = jwt(data.access_token);

			cookies.set("vsm_authorization", data.access_token, {
				expires: new Date(decoded.exp * 1000),
			});

			checkUserLoggedIn();

			setMessage(`Welcome ${data.user.first_name}. Login Successful`);

			toast.success(`Welcome ${data.user.first_name}. Login Successful`, {
				duration: 6000,
			});

			history.push("/home");

			setTimeout(() => {
				setMessage("");
				setApproved(false);
			}, 4000);
		} else {
			setError(true);
			setMessage(data.error);

			if (data.username && data.password) {
				toast.error("Username and password required", {
					duration: 6000,
				});
			} else if (data.username) {
				toast.error(data.username[0], {
					duration: 6000,
				});
			} else if (data.password) {
				toast.error(data.password[0], {
					duration: 6000,
				});
			} else {
				toast.error(data.error, {
					duration: 6000,
				});
			}

			setTimeout(() => {
				setError(false);
				setMessage("");
			}, 4000);
		}

		console.log(data);

		setLoading(false);

		toast.dismiss(toastLoading);
	};

	const verifyUser = async ({ username, password }) => {
		setLoading(true);

		const res = await fetch(`${API_URL}/user/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const data = await res.json();

		if (res.ok) {
			setApproved(true);
			setMessage(data.message);
			setIsCode(false);
			setIsEmail(false);
			setIsDetails(false);
			setStepTwo(true);
			setUserExists(false);
			setUser(data.user);
			setIsPlan(true);
			setToken(data.access_token);

			setTimeout(() => {
				setMessage("");
				setApproved(false);
			}, 4000);
		} else {
			setError(true);
			setMessage(data.error);

			setTimeout(() => {
				setError(false);
				setMessage("");
			}, 4000);
		}

		setTimeout(() => {
			setMessage("");
			setApproved(false);
		}, 4000);

		setLoading(false);
	};

	const submitVsmPayment = async ({ ref, discountId }) => {
		setLoading(true);

		const res = await fetch(`${API_URL}/subscription/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				tx_ref: ref,
				discount_id: discountId,
			}),
		});

		const data = await res.json();
	};

	const forgotPassword = async ({ username }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username }),
		});

		const data = await res.json();

		console.log(data);

		setUserId(data.user_id);

		if (res.ok) {
			setApproved(true);

			setMessage(data.mesage);
			setIsModal(true);

			// setTimeout(() => {

			// }, 5000);

			// toast.success(data.message, {
			// 	duration: 6000,
			// });
			setEmailCode(data.code);
			setUserId(data.user_id);
			setIsReset(true);

			setTimeout(() => {
				// setApproved(false);
				setIsCodeReset(true);
				setIsForgot(false);
				// setIsModal(false);
				// setMessage("");
			}, 3000);
		} else {
			setError(true);
			setMessage(data.error);
			toast.error(data.message, {
				duration: 6000,
			});

			setTimeout(() => {
				setError(false);
			}, 3000);
		}
		setUserId(data.user_id);

		setLoading(false);
		toast.dismiss(toastLoading);
	};

	const resetPassword = async ({ userId, password }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/forgot-password/reset`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_id: userId, password }),
		});

		const data = await res.json();

		if (res.ok) {
			setApproved(true);
			setMessage("Password reset successful! You can now login");
			// toast.success("Password reset successful! You can now login", {
			// 	duration: 6000,
			// });
			setIsModal(true);
			setIsResetPass(true);

			// setIsLogin(true);

			setTimeout(() => {
				setApproved(false);
				setUserExists(true);
				setIsCodeReset(false);
				setIsReset(false);
			}, 4000);
		} else {
			setError(true);
			setMessage(data.password[0]);

			toast.error(data.password[0], {
				duration: 6000,
			});

			setTimeout(() => {
				setError(false);
			}, 7000);
		}

		setLoading(false);
		toast.dismiss(toastLoading);
	};

	const resendForgotCode = async ({ userId }) => {
		setLoading(true);

		const res = await fetch(`${API_URL}/forgot-password/resend-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: userId }),
		});

		const data = await res.json();

		setIsCodeReset(true);

		setApproved(true);
		setMessage(data.message);

		setTimeout(() => {
			setApproved(false);
		}, 4000);
	};

	const codeResend = async ({ userId }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/registration/resend-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: userId }),
		});

		const data = await res.json();

		console.log(data);

		setIsCodeReset(true);

		setApproved(true);
		setMessage(data.message);

		toast.dismiss(toastLoading);
		toast.success(data.message, {
			duration: 6000,
		});

		setTimeout(() => {
			setApproved(false);
		}, 4000);
	};

	const googleLogin = async ({ token, firstname, surname, photo, email }) => {
		setLoading(true);
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/auth/social/google`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				id_token: token,
				first_name: firstname,
				surname,
				photo,
				email,
				id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
			}),
		});

		const data = await res.json();

		console.log(data);

		console.log(data.access_token);

		if (res.ok) {
			setToken(data.access_token);
			toast.success("Login successful!");
		}

		console.log(token);

		setLoading(false);
		toast.dismiss(toastLoading);
	};

	return (
		<AuthContext.Provider
			value={{
				stepOne,
				setStepOne,
				stepTwo,
				setStepTwo,
				stepThree,
				setStepThree,
				isEmail,
				setIsEmail,
				isCode,
				setIsCode,
				isDetails,
				setIsDetails,
				validateEmail,
				emailCode,
				setEmailCode,
				loading,
				setLoading,
				approved,
				setApproved,
				error,
				setError,
				message,
				setMessage,
				register,
				userId,
				verifyUser,
				userExists,
				setUserExists,
				isPlan,
				setIsPlan,
				plans,
				setPlans,
				token,
				isCheckout,
				setIsCheckout,
				user,
				setUser,
				discountId,
				setDiscountId,
				showBg,
				setShowBg,
				ref,
				setRef,
				isSuccess,
				setIsSuccess,
				username,
				setUsername,
				forgotPassword,
				resetPassword,
				isForgot,
				setIsForgot,
				isReset,
				setIsReset,
				setIsCodeReset,
				isCodeReset,
				resendForgotCode,
				isPaid,
				setIsPaid,
				submitVsmPayment,
				login,
				isChange,
				setIsChange,
				isLogin,
				setIsLogin,
				codeResend,
				isAgree,
				setIsAgree,
				type,
				setType,
				googleLogin,
				newsletter,
				setNewsletter,
				checkUserLoggedIn,
				profData,
				setProfData,
				medData,
				setMedData,
				resultReading,
				setResultReading,
				chartData,
				setChartData,
				vitals,
				setVitals,
				logout,
				canCapture,
				setCanCapture,
				isModal,
				setIsModal,
				isResetPass,
				setIsResetPass,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
