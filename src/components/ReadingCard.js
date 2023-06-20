import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import "./History.scss";

const ReadingCard = ({ icon, value, name, description, status }) => {
	const [modal, setModal] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");

	console.log(status);

	const handleModal = () => {
		setModal(!modal);

		// setTitle(name);
		// setNote(description);
	};
	return (
		<div>
			{modal && (
				<div className=" modal fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
					<div className=" modal-card bg-white p-[1rem] w-[20rem] mx-auto">
						<h1 className=" text-xl mb-[1rem]">{name}</h1>
						<p className=" text-sm">{description}</p>

						<div className=" text-primary mt-[1rem] flex justify-between items-center text-sm">
							<p className=" cursor-pointer" onClick={() => setModal(!modal)}>
								Close
							</p>
							<a href="http://">Read More</a>
						</div>
					</div>
				</div>
			)}

			<div className="">
				<div className="item">
					<div className="title">
						<div
							className={` ${status === "warning" && "warning"} ${
								status === "high" && "danger"
							} ${status === "ok" && "normal"} icon`}
						>
							<img src={icon} alt="icon-result" className=" w-[2rem]" />
						</div>
					</div>

					<div className=" text-center">
						<div className="name">{name}</div>
						<div
							className={` ${status === "warning" && "warn-text"} ${
								status === "high" && "high-text"
							} ${status === "ok" && "normal-text"} value regular`}
						>
							{value}
						</div>
						{/* <div className="no-value"></div> */}
					</div>

					<BsInfoCircleFill
						color="#AEC5F1"
						fontSize={30}
						className=" text-[#AEC5F1] text-xl cursor-pointer"
						onClick={() => handleModal(title, description)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ReadingCard;
