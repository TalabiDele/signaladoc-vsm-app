import React, { useState, useContext, useMemo, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import countryList from "react-select-country-list";
import Select from "react-select";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { FaThumbsUp } from "react-icons/fa";

const ProfileEdit = () => {
	const { user, profData, medData, checkUserLoggedIn } =
		useContext(AuthContext);

	console.log(user);
	console.log(profData);
	console.log(medData);

	const [first, setFirst] = useState(user?.first_name);
	const [last, setLast] = useState(user?.surname);
	const [gender, setGender] = useState(profData?.gender);
	const [dob, setDob] = useState(profData?.dob);
	const [height, setHeight] = useState(medData?.height);
	const [weight, setWeight] = useState(medData?.weight);
	const [blood, setBlood] = useState();
	// const [blood, setBlood] = useState(medData?.blood_group_id);
	const [country, setCountry] = useState(user?.country);
	const [address, setAddress] = useState(profData?.address);
	const [isInches, setIsInches] = useState(false);
	const [isCm, setIsCm] = useState(true);
	const [isKg, setIsKg] = useState(true);
	const [isLbs, setIsLbs] = useState(false);
	const [bloodGroup, setBloodGroup] = useState();
	const [photo, setPhoto] = useState();
	const [isModal, setIsModal] = useState(false);
	const [isPhoto, setIsPhoto] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	const cookies = new Cookies();

	const history = useHistory();

	useEffect(() => {
		const handleBlood = async () => {
			const res = await fetch(`${API_URL}/common/blood-groups`);

			const data = await res.json();
			console.log(data);

			setBloodGroup(data.data);
		};

		handleBlood();
	}, []);

	const options = useMemo(() => countryList().getData(), []);

	const handleChange = (e) => {
		setPhoto(e.target.files[0]);

		console.log(e.target.files[0]);

		handleUpload(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		const toastLoading = toast.loading("Loading...");
		let formData = new FormData();

		console.log(e);

		formData.append("photo", e);

		const res = await fetch(`${API_URL}/user/profile/photo`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: formData,
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			// toast.success(data.message, {
			// 	duration: 6000,
			// });
			setIsModal(true);
			setIsPhoto(true);

			setIsUpdate(false);

			checkUserLoggedIn();
		} else {
			toast.error(data.photo[0], {
				duration: 6000,
			});
		}

		toast.dismiss(toastLoading);

		checkUserLoggedIn();
	};

	const handleInches = () => {
		setIsInches(true);
		setIsCm(false);

		console.log(isInches);
	};

	const handleCm = () => {
		setIsCm(true);
		setIsInches(false);

		console.log(isCm);
	};

	const handleHeight = (e) => {
		if (isCm) {
			setHeight(e.target.value);
		} else if (isInches) {
			setHeight(e.target.value * 2.54);
		}
	};

	const handleKg = () => {
		setIsKg(true);
		setIsLbs(false);
	};

	const handleLbs = () => {
		setIsLbs(true);
		setIsKg(false);
	};

	const handleWeight = (e) => {
		if (isKg) {
			setWeight(e.target.value);
		} else if (isLbs) {
			setWeight(e.target.value / 2.205);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		const toastLoading = toast.loading("Loading...");

		console.log(country);

		const res = await fetch(`${API_URL}/user/profile/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				first_name: first,
				surname: last,
				dob,
				gender,
				address,
				country,
				blood_group_id: blood,
				weight,
				height,
			}),
		});

		const data = await res.json();
		if (res.ok) {
			toast.success("Profile updated!", {
				duration: 6000,
			});

			// history.push("/account");
			setIsModal(true);
			setIsUpdate(true);

			setIsPhoto(false);
		} else {
			toast.error("All fields are compulsory!", {
				duration: 6000,
			});
		}

		console.log(data);

		toast.dismiss(toastLoading);
	};

	const handleModal = () => {
		setIsModal(false);

		// history.push("/account");
	};

	const handleIsUpdate = () => {
		setIsModal(false);

		history.push("/account");
	};

	return (
		<div className=" w-[70%] mx-auto pt-[2rem] pb-[7rem] max-md:w-[90%] max-md:pb-[5rem] max-2xl:ml-[20rem] max-md:mx-auto max-lg:ml-[15rem]">
			{isModal && isPhoto && (
				<Modal
					icon={<FaThumbsUp className=" text-primary text-3xl" />}
					text={"Profile Photo Updated!"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => handleModal()}
				/>
			)}
			{isModal && isUpdate && (
				<Modal
					icon={<FaThumbsUp className=" text-primary text-3xl" />}
					text={"Profile Updated!"}
					btn={true}
					btnType={"text"}
					btnText={"Ok"}
					btnCount={1}
					color={"text-primary medium"}
					event={() => handleIsUpdate()}
				/>
			)}
			<h1 className=" text-3xl relative z-[5] max-md:top-[3rem] max-md:mb-[2rem]">
				Edit Profile
			</h1>
			<div className=" mt-[4rem]">
				<div className=" mb-[3rem] flex items-center medium">
					{user.photo === "default.jpg" ? (
						<div className=" bold bg-[#AEC5F1] rounded-md h-[3rem] w-[3rem] py-[0.5rem] px-[1rem] max-md:px-[0.5rem] max-md:py-[0.1rem] mr-[1rem] flex items-center justify-center text-2xl">
							{user.first_name.charAt(0)}
						</div>
					) : (
						<img
							src={user.photo_url}
							alt=""
							className=" w-[3rem] h-[3rem] rounded-full mb-[0.5rem] mr-[1rem]"
						/>
					)}
					<input
						type="file"
						name="photo"
						id="photo"
						className=" hidden"
						onChange={(e) => handleChange(e)}
					/>
					<label htmlFor="photo" className=" text-primary cursor-pointer">
						Change profile photo
					</label>
				</div>

				<form
					action=""
					className=" w-[50%] max-md:w-full"
					onSubmit={handleUpdate}
				>
					<label
						htmlFor="firstName"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						value={first}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setFirst(e.target.value)}
					/>

					<label
						htmlFor="lastName"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						value={last}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setLast(e.target.value)}
					/>

					<label
						htmlFor="gender"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						Gender
					</label>
					<select
						name="gender"
						id="gender"
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setGender(e.target.value)}
						value={gender}
					>
						<option value={0}>Female</option>
						<option value={1}>Male</option>
					</select>

					<label htmlFor="dob" className=" text-sm text-text_gray mb-[0.5rem]">
						Date of Birth
					</label>
					<input
						type="date"
						name="dob"
						id="dob"
						value={dob}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setDob(e.target.value)}
					/>

					<div className="flex justify-between mb-[0.5rem]">
						<label htmlFor="height" className=" text-sm text-text_gray">
							Height in centimeters
						</label>
						<div className="flex">
							<div
								className={` ${
									isInches ? "bg-primary" : "bg-input_border"
								} text-white cursor-pointer rounded-sm py-[0.1rem] px-[0.5rem] mr-[1rem]`}
								onClick={() => handleInches()}
							>
								in
							</div>
							<div
								className={` ${
									isCm ? "bg-primary" : "bg-input_border"
								}  text-white cursor-pointer rounded-sm py-[0.1rem] px-[0.5rem]`}
								onClick={() => handleCm()}
							>
								cm
							</div>
						</div>
					</div>
					<input
						type="number"
						name="height"
						id="height"
						value={height}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => handleHeight(e)}
					/>

					<div className="flex justify-between mb-[0.5rem]">
						<label htmlFor="height" className=" text-sm text-text_gray">
							Weight in kg
						</label>
						<div className="flex">
							<div
								className={` ${
									isKg ? "bg-primary" : "bg-input_border"
								} text-white cursor-pointer rounded-sm py-[0.1rem] px-[0.5rem] mr-[1rem]`}
								onClick={() => handleKg()}
							>
								kg
							</div>
							<div
								className={` ${
									isLbs ? "bg-primary" : "bg-input_border"
								}  text-white cursor-pointer rounded-sm py-[0.1rem] px-[0.5rem]`}
								onClick={() => handleLbs()}
							>
								lbs
							</div>
						</div>
					</div>
					<input
						type="number"
						name="height"
						id="height"
						value={weight}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => handleWeight(e)}
					/>

					<label
						htmlFor="blood"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						Blood group
					</label>
					<select
						name="blood"
						id="blood"
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setBlood(e.target.value)}
						value={blood}
					>
						<option value="" disabled selected hidden>
							Choose Blood Group
						</option>
						{bloodGroup &&
							bloodGroup?.map((e) => (
								<option value={e.id} key={e.id}>
									{e.group}
								</option>
							))}
					</select>

					<label
						htmlFor="country"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						Country
					</label>
					{/* <Select
          options={options}
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
          className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
        /> */}
					<select
						name="country"
						id="country"
						onChange={(e) => setCountry(e.target.value)}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						value={country}
					>
						{options.map((e) => (
							<option key={e.value} value={e.value}>
								{e.label}
							</option>
						))}
					</select>

					<label
						htmlFor="address"
						className=" text-sm text-text_gray mb-[0.5rem]"
					>
						Address
					</label>
					<input
						type="text"
						name="address"
						id="address"
						value={address}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setAddress(e.target.value)}
					/>

					<button className="bg-primary text-white rounded-md py-[0.5rem] px-[5rem]">
						Update profile
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProfileEdit;
