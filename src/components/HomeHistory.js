import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import { BsInfoCircleFill } from "react-icons/bs";
import heartResult from "assets/images/heart-hist.png";
import respRateResult from "assets/images/resp-hist.png";
import oxygenResult from "assets/images/oxygen-hist.png";
import stressResult from "assets/images/stress-hist.png";
import bpResult from "assets/images/bp-hist.png";
import "./History.scss";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReadingCard from "./ReadingCard";
import "./General.scss";

const HomeHistory = () => {
	const [history, setHistory] = useState();
	const [modal, setModal] = useState(false);
	const [name, setName] = useState("");
	const [note, setNote] = useState("");

	const cookies = new Cookies();

	useEffect(() => {
		const handleHistory = async () => {
			const res = await fetch(`${API_URL}/vital-sign/history`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			setHistory(data);

			console.log(data.data[0]);
		};

		handleHistory();
	}, []);

	console.log(history);

	return (
		history?.data?.length > 0 && (
			<div className="results-contain">
				<div className=" flex justify-end text-primary w-full mb-[1rem] cursor-pointer">
					<Link to="/history">
						<div className=" flex items-center medium">
							<p className=" mr-[1rem]">View reading history</p>
							<BsChevronRight />
						</div>
					</Link>
				</div>
				<div className="msg-block">
					<div className="flex justify-between w-[80%] max-md:w-full max-md:flex-col">
						<p className=" mr-[3rem] max-md:mr-[1rem]">Vital Signs</p>
						<p className=" ml-[3rem] max-md:ml-[0rem]">
							{history?.data[0]?.date_time}
						</p>
					</div>
				</div>

				{modal && (
					<div className=" modal fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
						<div className=" modal-card bg-white p-[1rem] w-[20rem] mx-auto">
							<h1 className=" text-xl mb-[1rem]">{name}</h1>
							<p className=" text-sm">{note}</p>

							<div className=" text-primary mt-[1rem] flex justify-between items-center text-sm">
								<p className=" cursor-pointer" onClick={() => setModal(!modal)}>
									Close
								</p>
								<a href="http://">Read More</a>
							</div>
						</div>
					</div>
				)}

				<div className="w-full grid grid-cols-2 max-md:grid-cols-1">
					<ReadingCard
						icon={bpResult}
						name="Blood Pressure"
						value={history?.data[0]?.blood_pressure_display}
						description={
							"The pressure of circulating blood on the walls of blood vessels."
						}
						status={history?.data[0].blood_pressure_indicator}
					/>

					<ReadingCard
						icon={heartResult}
						name="Heart Rate"
						value={history?.data[0]?.beats_per_minute_display}
						description={
							"Also known as pulse, this the number of times a person’s heart beats per minute."
						}
						status={history?.data[0].beats_per_minute_indicator}
					/>

					<ReadingCard
						icon={stressResult}
						name="Stress Level"
						value={history?.data[0]?.stress_status_display}
						description={
							"Based on Baevsky’s and US/European Index level measurements."
						}
						status={history?.data[0].stress_status_indicator}
					/>

					<ReadingCard
						icon={oxygenResult}
						name="Oxygen Saturation"
						value={history?.data[0]?.oxygen_display}
						description={
							"The percentage of oxyhemoglobin (oxygen bound hemoglobin) in the blood."
						}
						status={history?.data[0].oxygen_indicator}
					/>

					<ReadingCard
						icon={respRateResult}
						name="Respiratory Rate"
						value={history?.data[0]?.respiration_rate_display}
						description={
							"A person’s respiratory rate is the number of breaths they take per minute."
						}
						status={history?.data[0].respiration_rate_indicator}
					/>
				</div>
			</div>
		)
	);
};

export default HomeHistory;
