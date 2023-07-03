import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Unavailable from "./Unavailable";
import image from "assets/images/transaction.png";
import TransactRow from "./TransactRow";
import Cookies from "universal-cookie";
import { API_URL } from "./config";

const Transaction = () => {
	const [transact, setTransact] = useState(null);

	const { user, setIsLoading } = useContext(AuthContext);

	const cookies = new Cookies();

	useEffect(() => {
		const handleHistory = async () => {
			setIsLoading(true);
			const res = await fetch(`${API_URL}/finance/transaction/history`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			setTransact(data);

			setIsLoading(false);
		};

		handleHistory();
	}, []);

	return (
		<div>
			<div className=" w-[70%] mx-auto max-md:w-[100%] pb-[10rem]">
				{user?.active_subscription ? (
					transact?.data.map((e) => (
						<div className="" key={e.id}>
							<TransactRow
								type={e.particulars}
								date={e.date}
								refe={e.reference}
								amount={e.amount}
								status={e.status}
							/>
						</div>
					))
				) : (
					<Unavailable icon={image} text={"No Transaction History"} />
				)}
			</div>
		</div>
	);
};

export default Transaction;
