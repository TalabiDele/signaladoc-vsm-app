import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext";
import ActivePlan from "./ActivePlan";
import { useLocation, useHistory } from "react-router-dom";
import { BsFillCheckCircleFill, BsPersonHeart } from "react-icons/bs";
import {
	FlutterWaveButton,
	closePaymentModal,
	useFlutterwave,
} from "flutterwave-react-v3";
import { PAYSTACK_PUBLIC_KEY, RAVE_KEY } from "./config";
import { usePaystackPayment } from "react-paystack";
import paystack from "assets/images/paystack.png";
import flutterwave from "assets/images/flutterwave.png";
import { API_URL } from "./config";
// import { url } from "inspector";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";
import DiscountCheck from "./DiscountCheck";
import Modal from "./Modal";

const PaymentSummary = () => {
	const [code, setCode] = useState("");
	const [url, setUrl] = useState("");
	const [modal, setModal] = useState(false);
	const [message, setMessage] = useState("");
	const [promoDetails, setPromoDetails] = useState();
	const [amount, setAmount] = useState();
	const [promoModal, setPromoModal] = useState(false);

	const [price, setPrice] = useState();

	const location = useLocation();
	const history = useHistory();

	const { user, checkUserLoggedIn, setIsLoading } = useContext(AuthContext);

	const cookies = new Cookies();

	const [details, setDetails] = useState(location.state.e);

	useEffect(() => {
		if (details?.amount) {
			setAmount(details?.amount);
		} else if (details.discount_amount) {
			setAmount(details.discount_amount);
		}

		if (details?.price) {
			setPrice(details?.price);
		} else {
			setPrice(details?.discount_amount_formatted);
		}

		// details?.price
		// 						? details?.price
		// 						: details?.discount_amount_formatted
	}, []);

	const raveMin = 10000;
	const raveMax = 99999;

	const config = {
		public_key: RAVE_KEY,
		tx_ref: `VSM-${Math.floor(
			raveMin + Math.random() * (raveMax - raveMin)
		).toString()}-${Math.floor(Date.now() / 1000).toString()}`,
		amount: amount,
		currency: details?.currency
			? details?.currency.code
			: details?.plan.currency.code,
		payment_options: "card,mobilemoney,ussd",
		customer: {
			email: user?.email,
			phone_number: user?.phone_number,
			name: user?.name,
		},
		customizations: {
			title: "SignalADoc",
			description: "Subscription",
			logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
		},
		meta: {
			user_id: user?.id,
			section: "vsm-subscription",
			period: details?.period,
			country: details?.country_code,
			price_id: details?.id,
			promo_code: code,
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	const handleCompanyPayment = async (e) => {
		setIsLoading(true);
		const res = await fetch(
			`${API_URL}/finance/subscription/individual/verify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					reference: details?.plan_ids[1].keyword,
					enrollee_id: code,
					plan_id: details?.plan_ids[1].plan_id,
					// tx_ref: e.tx_ref.toString(),
				}),
			}
		);

		const data = await res.json();

		setIsLoading(false);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);
			checkUserLoggedIn();
		}
	};

	const handleModal = () => {
		setModal(false);

		history.push("/plans");
	};

	const handleCompanyPaymentTwo = async (e) => {
		setIsLoading(true);
		const res = await fetch(
			`${API_URL}/finance/subscription/individual/verify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					reference: details?.plan_ids[0].keyword,
					enrollee_id: code,
					plan_id: details?.plan_ids[0].plan_id,
					// tx_ref: e.tx_ref.toString(),
				}),
			}
		);

		const data = await res.json();

		console.log(data);

		setIsLoading(false);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);

			checkUserLoggedIn();
		}
	};

	const handlePayGoPayment = async (e) => {
		setIsLoading(true);
		const res = await fetch(`${API_URL}/finance/pay-go/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				keyword: details?.gateways[1].keyword,
				promo_code: code,
				trx_ref: e.tx_ref,
			}),
		});

		const data = await res.json();

		console.log(data);

		setIsLoading(false);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);

			checkUserLoggedIn();
		}
	};

	const handlePayGoPaymentTwo = async (e) => {
		setIsLoading(true);
		const res = await fetch(`${API_URL}/finance/pay-go/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				keyword: details?.gateways[0].keyword,
				promo_code: code,
				trx_ref: e.txref,
			}),
		});

		const data = await res.json();

		console.log(data);

		setIsLoading(true);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);

			checkUserLoggedIn();
		}
	};

	const handleIndividualPayment = async (e) => {
		setIsLoading(true);
		const res = await fetch(
			`${API_URL}/finance/subscription/individual/verify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					keyword: details?.plan_ids[1].keyword,
					promo_code: code,
					fee_id: details?.id,
					trx_ref: e.tx_ref,
				}),
			}
		);

		const data = await res.json();

		console.log(data);

		setIsLoading(false);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);

			checkUserLoggedIn();
		}
	};

	// console.log(
	// 	`VSM-${Math.floor(
	// 		raveMin + Math.random() * (raveMax - raveMin)
	// 	).toString()}-${Math.floor(Date.now() / 1000).toString()}`
	// );

	const handleIndividualPaymentTwo = async (e) => {
		console.log(e);

		setIsLoading(true);

		const res = await fetch(
			`${API_URL}/finance/subscription/individual/verify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					keyword: details?.plan_ids[0].keyword,
					promo_code: code,
					fee_id: details?.id,
					trx_ref: e.reference,
				}),
			}
		);

		const data = await res.json();

		console.log(data);

		setIsLoading(false);

		if (res.ok) {
			setModal(true);

			setMessage(data.message);

			checkUserLoggedIn();
		}
	};

	console.log(location.state.isType);

	const paystackConfig = {
		reference: `VSM-${Math.floor(
			raveMin + Math.random() * (raveMax - raveMin)
		).toString()}-${Math.floor(Date.now() / 1000).toString()}`,
		email: user?.email,
		amount: `${amount}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
		publicKey: PAYSTACK_PUBLIC_KEY,
	};

	// you can call this function anything
	const onSuccess = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		if (location.state.isType === "individual") {
			handleIndividualPaymentTwo(reference);
		} else if (location.state.isType === "company") {
			handleCompanyPaymentTwo(reference);
		} else if (location.state.isType === "payGo") {
			handlePayGoPaymentTwo(reference);
		}

		console.log(reference);
	};

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const handlePromo = async () => {
		setIsLoading(true);
		const res = await fetch(`${API_URL}/promo-code/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				code,
				section: "subscription",
			}),
		});

		const data = await res.json();

		console.log(data);

		setIsLoading(false);

		if (res.ok) {
			setPromoModal(true);

			setMessage(data.message);

			checkUserLoggedIn();

			data.prices.map((e) => {
				if (details?.id === e.id) {
					setAmount(e.amount);
					setPrice(e.amount_formatted);
				}
			});

			console.log(amount);

			setPromoDetails(data);
		} else {
			toast.error(data.message, {
				duration: 6000,
			});
		}
	};

	const PaystackHookExample = () => {
		const initializePayment = usePaystackPayment(paystackConfig);
		return (
			<div>
				<button
					onClick={() => {
						initializePayment(onSuccess, onClose);
					}}
					className=" flex items-center text-xl bg-[#011B33] py-[0.5rem] px-[1rem] rounded-md medium text-white justify-between w-[20rem]"
				>
					Pay with <img src={paystack} alt="" className=" w-[10rem]" />
				</button>
			</div>
		);
	};

	return (
		<div className={` relative w-[50vw] mx-auto max-md:w-[80vw] pt-[5rem]`}>
			{modal && (
				<Modal
					icon={<BsFillCheckCircleFill className=" text-primary text-3xl" />}
					text={message}
					header={"Success!"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => handleModal()}
				/>
			)}
			{promoModal && (
				<Modal
					icon={<BsFillCheckCircleFill className=" text-primary text-3xl" />}
					text={message}
					header={"Success!"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => setPromoModal(false)}
				/>
			)}
			<p className="medium fixed z-[4] top-[2rem] text-2xl">Payment Summary</p>
			{location.state.isDiscount ? (
				<DiscountCheck details={details} />
			) : (
				<div className=" mt-[3rem]">
					<ActivePlan
						icon={<BsPersonHeart className=" text-primary" />}
						type={details?.period_string}
						amount={price}
						discount={promoDetails && details?.price}
					/>
					<div className="mt-[2rem]">
						<label htmlFor="code">Have a promo code?</label>
						<div className=" relative w-[20rem] mt-[0.5rem]">
							<input
								type="text"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								id="code"
								name="code"
								className=" border border-1 border-bluee rounded-md py-[0.5rem] px-[0.5rem] w-full "
							/>
							<button
								className=" bg-light_blue text-primary py-[0.5rem] px-[1rem] border border-1 border-bluee rounded-md absolute right-[0rem]"
								onClick={() => handlePromo()}
							>
								Apply
							</button>
						</div>
					</div>

					<div className=" mt-[1rem]">
						<PaystackHookExample />
					</div>
					<div className=" mt-[1rem]">
						<button
							onClick={() => {
								handleFlutterPayment({
									callback: (response) => {
										console.log(response);

										if (location.state.isType === "individual") {
											handleIndividualPayment(response);
										} else if (location.state.isType === "company") {
											handleCompanyPayment(response);
										} else if (location.state.isType === "payGo") {
											handlePayGoPayment(response);
										}

										closePaymentModal(); // this will close the modal programmatically
									},
									onClose: () => {
										console.log("close");
									},
								});
							}}
							className=" flex items-center text-xl bg-[#F5A623] py-[0.5rem] px-[1rem] rounded-md medium justify-between w-[20rem]"
						>
							Pay with <img src={flutterwave} alt="" className=" w-[10rem]" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PaymentSummary;
