import React, { useState, useEffect, useContext } from "react";
import image from "../assets/images/heart-home.png";
import { Link } from "react-router-dom";
import History from "./History";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import ReactApexChart from "react-apexcharts";
import Chart from "./Chart";
import HomeHistory from "./HomeHistory";
import { RiErrorWarningLine } from "react-icons/ri";
import "./General.scss";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";

const Dash = () => {
	const { user, medData, profData, chartData, checkUserLoggedIn } =
		useContext(AuthContext);

	const history = useHistory();

	const [isModal, setIsModal] = useState(false);

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	return (
		<div className=" pt-[8rem] w-[70%] mx-auto max-md:w-[90%] pb-[5rem] max-lg:w-[90%] max-xl:w-[90%] max-md:pt-[4rem]">
			{isModal && (
				<Modal
					text={"Please update your profile before taking a reading."}
					btn={true}
					btnType={"primary"}
					btnText={"Update Profile"}
					btnCount={1}
					color={"text-white bg-primary rounded-md px-[2rem] medium"}
					event={() => history.push("/account/edit")}
				/>
			)}
			<div className=" max-md:flex items-center mb-[2rem] hidden">
				<div className=" regular bg-[#AEC5F1] rounded-md py-[0.5rem] px-[1rem] max-md:px-[0.5rem] max-md:py-[0.1rem] mr-[1rem] max-md:text-3xl ">
					{user?.first_name.charAt(0)}
				</div>
				<p className=" max-md:text-lg regular">Hi {user.first_name}, Welcome</p>
			</div>
			{!user?.updated_profile && (
				<Link
					to="/account/edit"
					className="fixed bg-light_blue py-[0.5rem] px-[1rem] rounded-sm top-[1rem] z-[2] flex items-center max-md:relative max-md:mb-[3rem] max-md:justify-center max-md:w-[90%]"
				>
					<p className=" text-md mr-[1rem]">
						Profile setup: Just a few more details
					</p>
					<RiErrorWarningLine className=" text-4xl text-primary" />
				</Link>
			)}
			<div className=" mb-[2rem]">
				<img src={image} alt="" className=" mb-[1rem]" />
				<p className=" mb-[1rem]">Track your vital signs today</p>
				{!user?.updated_profile ? (
					<button
						className=" bg-primary py-[0.5rem] px-[5rem] text-white rounded-sm"
						onClick={() => setIsModal(true)}
					>
						Take a reading
					</button>
				) : (
					<Link
						to={`/capture/?weight=${medData?.weight}&height=${medData?.height}&age=${profData?.age}`}
					>
						<button className=" bg-primary py-[0.5rem] px-[5rem] text-white rounded-sm">
							Take a reading
						</button>
					</Link>
				)}
			</div>

			{chartData?.has_data && <Chart />}

			<HomeHistory />
		</div>
	);
};

export default Dash;
