import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import { API_URL } from "./config";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Enroll = () => {
	const [modal, setModal] = useState(false);
	const [id, setId] = useState();
	const [code, setCode] = useState();
	const [number, setNumber] = useState();
	const [message, setMessage] = useState("");

	const history = useHistory();
	const cookies = new Cookies();

	const handleOnboard = async (e) => {
		e.preventDefault();
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/finance/company/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				company_id: id,
				plan_code: code,
				enrollee_number: number,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			setModal(true);
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

		history.push("/plans/explore");
	};

	return (
		<div className=" w-[70vw] mx-auto max-2xl:w-[60vw] max-xl:ml-[20rem] max-lg:ml-[13rem] max-md:mx-[auto] max-md:w-[80vw] max:md:w-[20rem] max-md:pb-[10rem]">
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

			<div className=" w-[50%] max-2xl:w-[70%] max-md:w-full">
				<Toaster position="top-center" reverseOrder={false} />
				<p className="text-2xl medium fixed top-[2rem] z-[4]">
					Activate My Plan
				</p>
				<div className=" pt-[7rem]">
					<p className=" medium mb-[1rem]">
						Please fill in the details below as provided by your organization.
					</p>
					<form action=" grid w-[90%]" onSubmit={handleOnboard}>
						<div className=" mb-[1rem]">
							<label htmlFor="firstname" className=" text-text_gray">
								Company Id
							</label>
							<input
								type="text"
								name="id"
								id="id"
								value={id}
								onChange={(e) => setId(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label htmlFor="lastname" className=" text-text_gray">
								Plan Code
							</label>
							<input
								type="text"
								name="code"
								id="code"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label
								htmlFor="email"
								className=" text-text_gray flex justify-between items-center"
							>
								Enrollee Number
							</label>

							<input
								type="text"
								name="number"
								id="number"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								className="text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>

						<button className=" bg-primary text-white border border-input_border py-[1rem] rounded-lg w-full mt-[2rem]">
							Proceed
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Enroll;
