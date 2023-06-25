import React, { useState, useContext } from "react";
import { BsPersonFillX } from "react-icons/bs";
import AuthContext from "./context/AuthContext";
import Cookies from "universal-cookie";
import Buttons from "./Buttons";
import { Link, useHistory } from "react-router-dom";
import { API_URL } from "./config";
import { toast } from "react-hot-toast";

const RemoveAccount = () => {
	const [email, setEmail] = useState("");
	const [modal, setModal] = useState(false);

	const { user, setUser } = useContext(AuthContext);

	const history = useHistory();

	const cookies = new Cookies();

	const handleDelete = async () => {
		const toastLoading = toast.loading("Deleting...");

		const res = await fetch(`${API_URL}/user/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				username: email,
			}),
		});

		const data = await res.json();

		console.log(data);

		// toast.dismiss(toastLoading);

		if (res.ok) {
			setModal(true);
			toast.dismiss(toastLoading);
		} else {
			//   toast.dismiss(toastLoading);
			if (data.username) {
				toast.error(data.username[0], {
					duration: 6000,
				});
			} else if (data.status === "error") {
				toast.error(data.message, {
					duration: 6000,
				});
			}
		}

		toast.dismiss(toastLoading);
	};

	const handleModal = () => {
		setModal(false);

		setUser(null);
		cookies.remove("vsm_authorization");

		history.push("/");
	};

	return (
		<div className=" w-[70%] mx-auto relative max-md:w-[90%] max-2xl:ml-[15rem] max-md:mx-auto ">
			{modal && (
				<div className=" modal  fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
					<div className=" rounded-md bg-white py-[1rem] px-[1rem] w-[30rem] mx-auto max-md:w-[90%]">
						<BsPersonFillX className=" text-danger text-7xl w-full mx-auto mb-[1rem]" />
						<h1 className=" text-lg font-medium text-center mb-[1rem]">
							Account Deleted
						</h1>
						<p className=" text-lg font-medium text-center mb-[1rem]">
							You will no longer have access to...
						</p>

						<div className="  text-primary mt-[1rem] flex justify-end items-center text-sm w-[80%] mx-auto font-bold max-md:w-[90%] ">
							<p className=" cursor-pointer" onClick={() => handleModal()}>
								Ok
							</p>
						</div>
					</div>
				</div>
			)}
			<p className=" text-danger absolute z-[3] top-[2rem] text-xl">
				Delete Account?
			</p>
			<div className=" w-[30rem] grid pt-[10rem] max-md:w-full max-md:pt-[6rem]">
				<p className=" text-lg max-md:text-center">
					Going ahead with this will delete your account details from all
					SignalsADoc platforms.
				</p>
				<BsPersonFillX className=" text-danger text-7xl w-full mx-auto my-[2rem]" />

				<label htmlFor="email" className=" text-text_gray">
					Email Address/Phone number
				</label>
				<input
					type="email"
					value={email}
					className=" text-lg px-[1rem] py-[0.5rem] border border-input_border rounded-lg mt-[0.5rem] bg-input_bg mb-[2rem]"
					name="email"
					id="email"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div className="flex items-center max-md:w-full max-md:justify-between">
					<div className="" onClick={() => handleDelete()}>
						<Buttons
							text={"Delete account"}
							px={"px-[3rem] max-md:px-[0.5rem] max-md:w-full mr-[1rem]"}
							border={"border-primary border-2"}
							bg={"bg-primary"}
							color={"text-white"}
						/>
					</div>
					<Link to="/account">
						<Buttons
							text={"Go back!"}
							px={"px-[2rem] "}
							border={"border-primary border-2"}
							bg={"none"}
							color={"text-primary"}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RemoveAccount;
