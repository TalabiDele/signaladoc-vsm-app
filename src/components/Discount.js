import React, { useState, useEffect, useContext } from "react";
import Unavailable from "./Unavailable";
import image from "assets/images/discount.png";
import DiscountCard from "./DiscountCard";
import firstBank from "assets/images/firstbank.png";
import gtb from "assets/images/gtb.png";
import Cookies from "universal-cookie";
import { API_URL } from "./config";
import { Link } from "react-router-dom";

const Discount = () => {
	const [list, setList] = useState();

	const cookies = new Cookies();

	useEffect(() => {
		const handleDiscount = async () => {
			const res = await fetch(`${API_URL}/finance/discount`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
				},
			});

			const data = await res.json();

			console.log(data);

			setList(data.banks);
		};

		handleDiscount();
	}, []);

	return (
		<div className=" w-[70vw] mx-auto max-md:w-[90vw]">
			<p className="text-2xl medium fixed top-[2rem] z-[4]">Discounts</p>
			<div className=" pt-[4rem] max-md:w-[90vw]">
				{list ? (
					list.map((e) => (
						<Link
							to={`/plans/discounts/${e.id}`}
							className="flex w-[50vw] mx-auto max-md:w-[10rem] max-md:m-[0.5rem]"
							key={e.id}
						>
							<DiscountCard
								logo={e.logo_large}
								text={`Get ${e.highest_percent} discount`}
							/>
						</Link>
					))
				) : (
					<Unavailable
						text={"There are no discounts available. Check back another time!"}
						icon={image}
					/>
				)}
			</div>
		</div>
	);
};

export default Discount;
