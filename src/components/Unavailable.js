import React, { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";

const Unavailable = ({ text, icon }) => {
	const { isLoading, setIsLoading } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<>
			{isLoading ? (
				<div></div>
			) : (
				<div>
					<div className=" text-center grid justify-items-center">
						<p className=" my-[3rem] text-xl">{text}</p>
						<img src={icon} alt="" className=" w-[30rem]" />
					</div>
				</div>
			)}
		</>
	);
};

export default Unavailable;
