import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import { BsChevronRight, BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import heartResult from "assets/images/heart-hist.png";
import respRateResult from "assets/images/resp-hist.png";
import oxygenResult from "assets/images/oxygen-hist.png";
import stressResult from "assets/images/stress-hist.png";
import bpResult from "assets/images/bp-hist.png";
import "./General.scss";

const History = () => {
	const cookies = new Cookies();
	const [histData, setHistData] = useState(null);
	const [modal, setModal] = useState(false);
	const [name, setName] = useState("");
	const [note, setNote] = useState("");

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

			setHistData(data);

			console.log(data);
		};

		handleHistory();
	}, []);

	const handleModal = (name, description) => {
		setModal(!modal);

		setName(name);
		setNote(description);
	};

	return (
		<div className="py-[10rem] relative w-[70%] mx-auto max-md:w-[90%] max-2xl:ml-[15rem] max-md:mx-auto">
			<h1 className="text-3xl fixed top-[1rem] z-[6] mx-auto max-md:top-[6rem] max-md:absolute max-md:z-[0]">
				Reading History
			</h1>

			{histData?.data.length === 0 && (
				<h2 className=" mt-[3rem]">No reading taken</h2>
			)}

			{histData?.data.map((e) => (
				<div className=" mb-[3rem]">
					<div className="msg-block">
						<div className="flex justify-between w-[40rem] max-md:w-[100%]">
							<p className=" mr-[3rem]">Vital Signs</p>
							<p className=" ml-[3rem]">{e.date_time}</p>
						</div>
					</div>

					{modal && (
						<div className=" modal fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
							<div className=" modal-card bg-white p-[1rem] w-[20rem] mx-auto">
								<h1 className=" text-xl mb-[1rem]">{name}</h1>
								<p className=" text-sm">{note}</p>

								<div className=" text-primary mt-[1rem] flex justify-between items-center text-sm">
									<p
										className=" cursor-pointer"
										onClick={() => setModal(!modal)}
									>
										Close
									</p>
									<a href="http://">Read More</a>
								</div>
							</div>
						</div>
					)}

					<div className=" grid grid-cols-2 max-md:grid-cols-1">
						<div className="item">
							<div className="title">
								<div
									className={` ${
										e.blood_pressure_indicator === "warning" && "warning"
									} ${e.blood_pressure_indicator === "danger" && "danger"} ${
										e.blood_pressure_indicator === "ok" && "normal"
									} icon`}
								>
									<img src={bpResult} alt="icon-result" className=" w-[2rem]" />
								</div>
							</div>

							<div className=" text-center">
								<div className="name">Blood Pressure</div>
								<div
									className={` ${
										e.blood_pressure_indicator === "warning" && "warn-text"
									} ${e.blood_pressure_indicator === "danger" && "high-text"} ${
										e.blood_pressure_indicator === "ok" && "normal-text"
									} value regular`}
								>
									{e.blood_pressure_display}
									{/* <span className="sign">{item.sign}</span> */}
								</div>
								{/* <div className="no-value"></div> */}
							</div>

							<BsInfoCircleFill
								color="#AEC5F1"
								fontSize={30}
								className=" text-[#AEC5F1] text-xl cursor-pointer"
								onClick={() =>
									handleModal(
										"Blood Pressure",
										"The pressure of circulating blood on the walls of blood vessels."
									)
								}
							/>
						</div>
						<div className="item">
							<div className="title">
								<div
									className={` ${
										e.beats_per_minute_indicator === "warning" && "warning"
									} ${e.beats_per_minute_indicator === "danger" && "danger"} ${
										e.beats_per_minute_indicator === "ok" && "normal"
									} icon`}
								>
									<img
										src={heartResult}
										alt="icon-result"
										className=" w-[2rem]"
									/>
								</div>
							</div>

							<div className=" text-center">
								<div className="name">Heart Rate</div>
								<div
									className={` ${
										e.beats_per_minute_indicator === "warning" && "warn-text"
									} ${
										e.beats_per_minute_indicator === "danger" && "high-text"
									} ${
										e.beats_per_minute_indicator === "ok" && "normal-text"
									} value regular`}
								>
									{e.beats_per_minute_display}
									{/* <span className="sign">{item.sign}</span> */}
								</div>
								{/* <div className="no-value"></div> */}
							</div>

							<BsInfoCircleFill
								color="#AEC5F1"
								fontSize={30}
								className=" text-[#AEC5F1] text-xl cursor-pointer"
								onClick={() =>
									handleModal(
										"Respiratory Rate",
										"Also known as pulse, this the number of times a person’s heart beats per minute."
									)
								}
							/>
						</div>

						<div className="item">
							<div className="title">
								<div
									className={` ${
										e.stress_status_indicator === "warning" && "warning"
									} ${e.stress_status_indicator === "danger" && "danger"} ${
										e.stress_status_indicator === "ok" && "normal"
									} icon`}
								>
									<img
										src={stressResult}
										alt="icon-result"
										className=" w-[2rem]"
									/>
								</div>
							</div>

							<div className=" text-center">
								<div className="name">Stress Level</div>
								<div
									className={` ${
										e.stress_status_indicator === "warning" && "warn-text"
									} ${e.stress_status_indicator === "danger" && "high-text"} ${
										e.stress_status_indicator === "ok" && "normal-text"
									} value regular`}
								>
									{e.stress_status_display}
									{/* <span className="sign">{item.sign}</span> */}
								</div>
								{/* <div className="no-value"></div> */}
							</div>

							<BsInfoCircleFill
								color="#AEC5F1"
								fontSize={30}
								className=" text-[#AEC5F1] text-xl cursor-pointer"
								onClick={() =>
									handleModal(
										"Stress Level",
										"Based on Baevsky’s and US/European Index level measurements."
									)
								}
							/>
						</div>

						<div className="item">
							<div className="title">
								<div
									className={` ${
										e.oxygen_indicator === "warning" && "warning"
									} ${e.oxygen_indicator === "danger" && "danger"} ${
										e.oxygen_indicator === "ok" && "normal"
									} icon`}
								>
									<img
										src={oxygenResult}
										alt="icon-result"
										className=" w-[2rem]"
									/>
								</div>
							</div>

							<div className=" text-center">
								<div className="name">Oxygen Saturation</div>
								<div
									className={` ${
										e.oxygen_indicator === "warning" && "warn-text"
									} ${e.oxygen_indicator === "danger" && "high-text"} ${
										e.oxygen_indicator === "ok" && "normal-text"
									} value regular`}
								>
									{e.oxygen_display}
									{/* <span className="sign">{item.sign}</span> */}
								</div>
								{/* <div className="no-value"></div> */}
							</div>

							<BsInfoCircleFill
								color="#AEC5F1"
								fontSize={30}
								className=" text-[#AEC5F1] text-xl cursor-pointer"
								onClick={() =>
									handleModal(
										"Oxygen Saturation",
										"The percentage of oxyhemoglobin (oxygen bound hemoglobin) in the blood."
									)
								}
							/>
						</div>
						<div className="item">
							<div className="title">
								<div
									className={` ${
										e.respiration_rate_indicator === "warning" && "warning"
									} ${e.respiration_rate_indicator === "danger" && "danger"} ${
										e.respiration_rate_indicator === "ok" && "normal"
									} icon`}
								>
									<img
										src={respRateResult}
										alt="icon-result"
										className=" w-[2rem]"
									/>
								</div>
							</div>

							<div className=" text-center">
								<div className="name">Respiratory Rate</div>
								<div
									className={` ${
										e.respiration_rate_indicator === "warning" && "warn-text"
									} ${
										e.respiration_rate_indicator === "danger" && "high-text"
									} ${
										e.respiration_rate_indicator === "ok" && "normal-text"
									} value regular`}
								>
									{e.respiration_rate_display}
									{/* <span className="sign">{item.sign}</span> */}
								</div>
								{/* <div className="no-value"></div> */}
							</div>

							<BsInfoCircleFill
								color="#AEC5F1"
								fontSize={30}
								className=" text-[#AEC5F1] text-xl cursor-pointer"
								onClick={() =>
									handleModal(
										"Respiratory Rate",
										"A person’s respiratory rate is the number of breaths they take per minute."
									)
								}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default History;
