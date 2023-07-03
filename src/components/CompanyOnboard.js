import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./General.scss";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import Modal from "./Modal";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const CompanyOnboard = () => {
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [orgName, setOrgName] = useState("");
	const [enrolles, setEnrollees] = useState();
	const [info, setInfo] = useState("");
	const [modal, setModal] = useState(false);
	const [message, setMessage] = useState("");

	const { currentCntry } = useContext(AuthContext);

	const history = useHistory();

	const cookies = new Cookies();

	const handleOnboard = async (e) => {
		e.preventDefault();
		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/finance/company/onboard`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				first_name: firstname,
				surname,
				email,
				phone_number: number,
				organization: orgName,
				number_of_people: enrolles,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			setModal(true);
			setMessage(data.message);
		} else {
			toast.error("All field are required!", {
				duration: 6000,
			});
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
					Onboard my Team
				</p>
				<div className=" pt-[7rem]">
					<p className=" medium mb-[1rem]">
						Six Individual Accounts Just what every team needs. Get your team
						onboard and keep them informed about their vital signs, so they can
						make better decisions about their wellbeing.
					</p>
					<form action=" grid w-[90%]" onSubmit={handleOnboard}>
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
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
								placeholder="Doe"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label
								htmlFor="email"
								className=" text-text_gray flex justify-between items-center"
							>
								Email
							</label>

							<input
								type="text"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
								placeholder="johndoe@email.com"
							/>
						</div>
						<div className="mb-[1rem]">
							<label htmlFor="number">Phone Number</label>
							<PhoneInput
								defaultCountry={currentCntry}
								placeholder="Enter phone number"
								value={number}
								onChange={setNumber}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg bg-light_blue mt-[0.5rem]"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label htmlFor="org" className=" text-text_gray">
								Name of Organization
							</label>
							<input
								type="org"
								name="org"
								id="org"
								value={orgName}
								onChange={(e) => setOrgName(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>
						<div className=" mb-[1rem]">
							<label
								htmlFor="refCode"
								className=" text-text_gray flex justify-between items-center"
							>
								How many people would you like to enroll
							</label>
							<input
								type="number"
								name="enroller"
								id="enrollee"
								value={enrolles}
								onChange={(e) => setEnrollees(e.target.value)}
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							/>
						</div>
						<div className=" ">
							<label
								htmlFor="refCode"
								className=" text-text_gray flex justify-between items-center"
							>
								Any additional information
							</label>
							<textarea
								name="info"
								id="info"
								value={info}
								onChange={(e) => setInfo(e.target.value)}
								cols="30"
								rows="5"
								className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem] bg-light_blue"
							></textarea>
						</div>

						<button className=" bg-primary text-white border border-input_border py-[1rem] rounded-lg w-full mt-[2rem]">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CompanyOnboard;
