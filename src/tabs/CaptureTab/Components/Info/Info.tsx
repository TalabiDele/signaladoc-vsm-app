import React from "react";
import { getSchema } from "helpers/capture";
import { RPPGData } from "helpers/rppg";
import { get } from "lodash";
import "./Info.scss";
import { FaHeartbeat } from "react-icons/fa";
import { GiLungs, GiBrain } from "react-icons/gi";
// import { ReactSVG } from "react-svg";

type Props = {
	rppgData: RPPGData;
};

export const Info: React.FC<Props> = ({ rppgData }) => {
	const schema = getSchema();

	// console.log(schema);

	return (
		<div className="info-container">
			<div className="info">
				<div className="data">
					{/* <ReactSVG src={require("../assets/heart.svg").default} /> */}
					{schema?.map((item) => (
						<div className="itemR" key={item.key}>
							<div className="value">
								{get(rppgData, item.key, 0) ? (
									<div className="ring-calculated">
										<img
											className=" w-[5rem]"
											// src={require("assets/images/result-mark.svg").default}
											src={item.iconResult}
											alt="calculated"
										/>
									</div>
								) : (
									<div className="ring-calculating">
										{/* <img
                      className="item-img"
                      src={require(`assets/images/${item.icon}`).default}
                      alt="calculating"
                    /> */}
										<img
											src={item.icon}
											className=" mx-auto text-xl text-primary item-img w-[2rem]"
											alt="calculating"
										/>
										<span></span>
									</div>
								)}
							</div>
							<div className="name">{item.name}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
