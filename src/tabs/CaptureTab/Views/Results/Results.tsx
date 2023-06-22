import { Button } from "@fluentui/react-northstar";
import { getSchema, Schema } from "helpers/capture";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { get } from "lodash";
import { RPPGData } from "helpers/rppg";
import "./Results.scss";
import { BsInfoCircleFill } from "react-icons/bs";
import Modal from "./Modal";
import AuthContext from "components/context/AuthContext";
import { useContext } from "react";
import Cookies from "universal-cookie";
import { API_URL } from "components/config";
import heartResult from "assets/images/heart-hist.png";
import respRateResult from "assets/images/resp-hist.png";
import oxygenResult from "assets/images/oxygen-hist.png";
import stressResult from "assets/images/stress-hist.png";
import bpResult from "assets/images/bp-hist.png";
import "components/General.scss";

export interface ResultData {
	rppgData: RPPGData;
	isAllDataCalculated: boolean;
}

export const Results = () => {
	const history = useHistory();
	const location = useLocation();

	const [data, setData] = useState<ResultData>();
	const [schema, setSchema] = useState<Schema[]>();
	const [modal, setModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [note, setNote] = useState<string>("");
	const [isDone, setIsDone] = useState<boolean>(false);

	const { setResultReading, resultReading, user } = useContext(AuthContext);

	console.log(resultReading);

	const cookies = new Cookies();

	useEffect(() => {
		const data = location.state as ResultData;
		if (!data) {
			history.push("/capture");
			return;
		}

		setSchema(getSchema());
		setData(data);

		console.log(data);

		const handleResult = async () => {
			console.log(data?.rppgData.measurementData.bpm);

			const res = await fetch(`${API_URL}/vital-sign`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
				body: JSON.stringify({
					systolic: data?.rppgData.bloodPressure.systolic,
					diastolic: data?.rppgData.bloodPressure.diastolic,
					bpm: data?.rppgData.measurementData.bpm,
					rr: data?.rppgData.measurementData.rr,
					oxygen: data?.rppgData.measurementData.oxygen,
					stressStatus: data?.rppgData.measurementData.stressStatus,
					bloodPressureStatus:
						data?.rppgData.measurementData.bloodPressureStatus,
				}),
			});

			const resData = await res.json();

			setResultReading(resData);

			console.log(resData);
		};

		handleResult();
	}, [history, location.state]);

	const onBackClickButtonHandler = () => {
		history.push("/capture");
	};

	const handleModal = (name: string, description: string) => {
		setModal(true);

		setName(name);
		setNote(description);
	};

	const handleDone = () => {
		setIsDone(!isDone);
	};

	return (
		<div className="results-container">
			<div className=" flex items-start w-full">
				<h1 className=" text-left mb-[2rem]">
					Hi {user?.first_name}, your results
				</h1>
			</div>
			<div className="msg-block">
				<div className="flex max-md:flex-col">
					<p className=" mr-[3rem]">Vital Signs</p>
					<p className=" ml-[3rem] max-md:ml-[0rem]">
						{resultReading?.vitals.date_time}
					</p>
				</div>
			</div>

			{modal && (
				<div className=" modal fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5] ">
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

			{isDone && (
				<div className=" modal  fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
					<div className=" rounded-md bg-white py-[1rem] px-[1rem] w-[30rem] mx-auto max-md:w-[90%]">
						<p className=" text-lg font-medium text-center">
							Hey Theresa! <br />
							How did your assessment go? <br />
							Would you like to chat with a doctor?
						</p>

						<div className="  text-primary mt-[1rem] flex justify-between items-center text-sm w-[80%] mx-auto font-bold max-md:w-[90%]">
							<p className=" cursor-pointer" onClick={() => setIsDone(!isDone)}>
								No
							</p>
							<Link to="/capture/results/doctor">
								<button className=" bg-primary text-white border-2 border-primary rounded-md py-[0.5rem] px-[1rem]">
									Yes Please
								</button>
							</Link>

							<button className=" text-primary border-2 border-primary rounded-md py-[0.5rem] px-[1rem]">
								Remind me later
							</button>
						</div>
					</div>
				</div>
			)}

			{/* {data && schema && (
        <div className="results grid grid-cols-2">
          {schema?.map((item) => (
            <div className="item" key={item.key}>
              <div className="title">
                <div className="icon">
                  <img src={item.iconResult} alt="icon-result" className=" " />
                </div>
              </div>

              <div className=" text-center">
                <div className="name">{item.name}</div>

                {get(data.rppgData, item.key, 0) ? (
                  <div className="value">
                    {get(data.rppgData, item.key, 0)}
                    <span className="sign">{item.sign}</span>
                  </div>
                ) : (
                  <div className="no-value"></div>
                )}
              </div>

              <BsInfoCircleFill
                color="#AEC5F1"
                fontSize={30}
                className=" text-[#AEC5F1] text-xl cursor-pointer"
                onClick={() => handleModal(item)}
              />
            </div>
          ))}
          {!data.isAllDataCalculated && (
            <div className="notification">
              <img
                src={require("assets/images/note-icon.svg").default}
                alt="icon-note"
              />
              One or more vitals were unable to be calculated due to bad
              lighting conditions, please try again later
            </div>
          )}
        </div>
      )} */}

			<div className="results grid grid-cols-2 max-md:grid-cols-1">
				<div className="item">
					<div className="title">
						<div
							className={` ${
								resultReading?.vitals.blood_pressure_indicator === "warning" &&
								"warning"
							} ${
								resultReading?.vitals.blood_pressure_indicator === "danger" &&
								"danger"
							} ${
								resultReading?.vitals.blood_pressure_indicator === "ok" &&
								"normal"
							} icon max-md:w-[2rem]`}
						>
							<img
								src={bpResult}
								alt="icon-result"
								className="  max-md:w-[2rem]"
							/>
						</div>
					</div>

					<div className=" text-center">
						<div className="name">Blood Pressure</div>
						<div
							className={` ${
								resultReading?.vitals.blood_pressure_indicator === "warning" &&
								"warn-text"
							} ${
								resultReading?.vitals.blood_pressure_indicator === "danger" &&
								"high-text"
							} ${
								resultReading?.vitals.blood_pressure_indicator === "ok" &&
								"normal-text"
							} value regular`}
						>
							{resultReading?.vitals.blood_pressure_display}
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
								resultReading?.vitals.beats_per_minute_indicator ===
									"warning" && "warning"
							} ${
								resultReading?.vitals.beats_per_minute_indicator === "danger" &&
								"danger"
							} ${
								resultReading?.vitals.beats_per_minute_indicator === "ok" &&
								"normal"
							} icon`}
						>
							<img src={heartResult} alt="icon-result" className=" " />
						</div>
					</div>

					<div className=" text-center">
						<div className="name">Heart Rate</div>
						<div
							className={` ${
								resultReading?.vitals.beats_per_minute_indicator ===
									"warning" && "warn-text"
							} ${
								resultReading?.vitals.beats_per_minute_indicator === "danger" &&
								"high-text"
							} ${
								resultReading?.vitals.beats_per_minute_indicator === "ok" &&
								"normal-text"
							} value regular`}
						>
							{resultReading?.vitals.beats_per_minute_display}
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
								resultReading?.vitals.stress_status_indicator === "warning" &&
								"warning"
							} ${
								resultReading?.vitals.stress_status_indicator === "danger" &&
								"danger"
							} ${
								resultReading?.vitals.stress_status_indicator === "ok" &&
								"normal"
							} icon`}
						>
							<img src={stressResult} alt="icon-result" className=" " />
						</div>
					</div>

					<div className=" text-center">
						<div className="name">Stress Level</div>
						<div
							className={` ${
								resultReading?.vitals.stress_status_indicator === "warning" &&
								"warn-text"
							} ${
								resultReading?.vitals.stress_status_indicator === "danger" &&
								"high-text"
							} ${
								resultReading?.vitals.stress_status_indicator === "ok" &&
								"normal-text"
							} value regular`}
						>
							{resultReading?.vitals.stress_status_display}
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
								resultReading?.vitals.oxygen_indicator === "warning" &&
								"warning"
							} ${
								resultReading?.vitals.oxygen_indicator === "danger" && "danger"
							} ${
								resultReading?.vitals.oxygen_indicator === "ok" && "normal"
							} icon`}
						>
							<img src={oxygenResult} alt="icon-result" className=" " />
						</div>
					</div>

					<div className=" text-center">
						<div className="name">Oxygen Saturation</div>
						<div
							className={` ${
								resultReading?.vitals.oxygen_indicator === "warning" &&
								"warn-text"
							} ${
								resultReading?.vitals.oxygen_indicator === "danger" &&
								"high-text"
							} ${
								resultReading?.vitals.oxygen_indicator === "ok" && "normal-text"
							} value regular`}
						>
							{resultReading?.vitals.oxygen_display}
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
								resultReading?.vitals.respiration_rate_indicator ===
									"warning" && "warning"
							} ${
								resultReading?.vitals.respiration_rate_indicator === "danger" &&
								"danger"
							} ${
								resultReading?.vitals.respiration_rate_indicator === "ok" &&
								"normal"
							} icon`}
						>
							<img src={respRateResult} alt="icon-result" className=" " />
						</div>
					</div>

					<div className=" text-center">
						<div className="name">Respiratory Rate</div>
						<div
							className={` ${
								resultReading?.vitals.respiration_rate_indicator ===
									"warning" && "warn-text"
							} ${
								resultReading?.vitals.respiration_rate_indicator === "danger" &&
								"high-text"
							} ${
								resultReading?.vitals.respiration_rate_indicator === "ok" &&
								"normal-text"
							} value regular`}
						>
							{resultReading?.vitals.respiration_rate_display}
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

				{/* {!data.isAllDataCalculated && (
            <div className="notification">
              <img
                src={require("assets/images/note-icon.svg").default}
                alt="icon-note"
              />
              One or more vitals were unable to be calculated due to bad
              lighting conditions, please try again later
            </div>
          )} */}
			</div>

			<button
				className=" bg-primary text-white py-[0.5rem] px-[5rem] rounded-md"
				onClick={() => handleDone()}
			>
				Done
			</button>

			{/* <Button
        primary
        onClick={onBackClickButtonHandler}
        content="Done"
      /> */}
		</div>
	);
};
