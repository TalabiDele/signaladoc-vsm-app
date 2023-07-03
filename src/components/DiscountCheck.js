import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import { API_URL } from "./config";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { MdCancel } from "react-icons/md";

const DiscountCheck = ({ details }) => {
	const [modal, setModal] = useState(false);
	const [id, setId] = useState();
	const [code, setCode] = useState();
	const [cardNumber, setCardNumber] = useState();
	const [expiry, setExpiry] = useState();
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);

	const history = useHistory();
	const cookies = new Cookies();

	const handleOnboard = async (e) => {
		e.preventDefault();
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(
			`${API_URL}/finance/discount/bank/verify-card/paystack`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					gateway: 2,
					card_number: cardNumber,
					expiry,
				}),
			}
		);

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			if (data.confirmed) {
				console.log("confirmed");
				setModal(true);
				setMessage(data.message);
			} else {
				console.log("not confirmed");
				setIsError(true);
				setMessage(data.message);
			}

			setMessage(data.message);
		} else {
			if (data.company_id && data.enrollee_number && data.plan_code) {
				toast.error("All field are invalid!", {
					duration: 6000,
				});
			} else if (data.company_id && data.enrollee_number) {
				toast.error("Company id & enrollee number are invalid!", {
					duration: 6000,
				});
			} else if (data.company_id && data.plan_code) {
				toast.error("Company id & plan code are invalid!", {
					duration: 6000,
				});
			} else if (data.plan_code && data.enrollee_number) {
				toast.error("Plan code and enrollee number are invalid!", {
					duration: 6000,
				});
			} else if (data.company_id) {
				toast.error(data.company_id[0], {
					duration: 6000,
				});
			} else if (data.plan_code) {
				toast.error(data.plan_code[0], {
					duration: 6000,
				});
			} else if (data.enrollee_number) {
				toast.error(data.enrollee_number[0], {
					duration: 6000,
				});
			}
		}

		toast.dismiss(toastLoading);
	};

	const handleModal = () => {
		setModal(false);

		setIsError(false);

		history.push("/plans/explore");
	};

	return (
		<div className=" w-[70vw] mx-auto max-2xl:w-[60vw] max-xl:mx-auto max-lg:mx-auto max-md:mx-[auto] max-md:w-[80vw] max:md:w-[20rem] max-md:pb-[10rem] pt-[4rem]">
			{modal && (
				<Modal
					icon={<BsFillCheckCircleFill className=" text-primary text-3xl" />}
					text={
						"Awesome! Our support team will reach out to you within 24 hours."
					}
					header={"Received!"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => handleModal()}
				/>
			)}
			{isError && (
				<Modal
					icon={<MdCancel className=" text-[#FC9249] text-3xl" />}
					text={message}
					header={"Card Not Eligible"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => handleModal()}
				/>
			)}

			<div className=" w-[50%] max-2xl:w-[70%] max-md:w-full">
				<Toaster position="top-center" reverseOrder={false} />
				<div className="">
					<p className=" flex items-center mb-[1rem]">
						<img
							src={details?.bank.logo_thumb}
							alt=""
							className=" w-[5rem] mr-[0.5rem]"
						/>{" "}
						{details.description}
					</p>
					<p className=" medium mb-[1rem]">
						We do not share any of your card details in any way.
					</p>
					<form action=" grid w-[90%]" onSubmit={handleOnboard}>
						<div className=" mb-[1rem]">
							<label htmlFor="card" className=" text-text_gray">
								Card Number
							</label>
							<input
								type="text"
								name="card"
								id="card"
								value={cardNumber}
								onChange={(e) => setCardNumber(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label htmlFor="expiry" className=" text-text_gray">
								Expiry Date
							</label>
							<input
								type="text"
								name="expiry"
								id="expiry"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>

						<button className=" bg-primary text-white border border-input_border py-[1rem] rounded-lg w-full mt-[2rem]">
							Pay
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default DiscountCheck;
