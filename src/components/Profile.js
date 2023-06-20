import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";
import Cookies from "universal-cookie";
import { FaUserEdit } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPersonFillX } from "react-icons/bs";

const Profile = () => {
	const [isNew, setIsNew] = useState(false);
	const [isOld, setIsOld] = useState(false);
	const [oldPass, setOldPass] = useState("");
	const [newPass, setNewPass] = useState("");
	const [photo, setPhoto] = useState();

	const { user, profData, medData, logout, checkUserLoggedIn } =
		useContext(AuthContext);

	const cookies = new Cookies();

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
			toast.success(data.message, {
				duration: 6000,
			});
		} else {
			toast.error(data.photo[0], {
				duration: 6000,
			});
		}

		toast.dismiss(toastLoading);

		checkUserLoggedIn();
	};

	const handlePasswordUpdate = async (e) => {
		e.preventDefault();

		const toastLoading = toast.loading("Loading...");

		const res = await fetch(`${API_URL}/user/profile/password`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.get("vsm_authorization")}`,
			},
			body: JSON.stringify({
				password: oldPass,
				new_password: newPass,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (data.success) {
			toast.success("Password changed!", {
				duration: 6000,
			});
		} else if (data.new_password) {
			toast.error(data.new_password[0], {
				duration: 10000,
			});
		} else {
			toast.error(data.message, {
				duration: 6000,
			});
		}

		setOldPass("");
		setNewPass("");

		toast.dismiss(toastLoading);
	};

	return (
		<div className=" pt-[5rem] w-[70%] mx-auto max-md:w-[90%] max-md:pb-[8rem] max-2xl:ml-[15rem] max-md:mx-auto">
			<h1 className=" mb-[2rem] text-xl relative z-[4] max-md:mt-[3rem]">
				Account
			</h1>
			<div className=" flex items-center justify-between border-b border-b-bluee pb-[1rem] max-md:justify-start max-md:border-b-0 max-md:mt-[3rem] max-md:flex-col max-md:items-start">
				<div className="">
					{user.photo === "default.jpg" ? (
						<div className=" bold bg-[#AEC5F1] rounded-md py-[0.5rem] px-[1rem] max-md:px-[0.5rem] h-[3rem] w-[3rem] flex justify-center items-center max-md:py-[0.1rem] mr-[1rem] ">
							{user.first_name.charAt(0)}
						</div>
					) : (
						<img
							src={user.photo_url}
							alt=""
							className=" w-[4rem] h-[4rem] rounded-full"
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
				<div className=" w-[70%] max-md:w-full">
					<Link
						to="/account/edit"
						className=" max-md:flex hidden max-md:items-center max-md:my-[1rem]"
					>
						<FaUserEdit className=" text-primary mb-[0.1rem] text-2xl max-md:mr-[0.5rem]" />
						<p className="">Edit Profile</p>
					</Link>

					<div className=" flex justify-between items-center w-full border-x border-x-bluee px-[4rem] h-[5rem] max-md:w-[90%] max-md:flex-col max-md:items-start max-md:h-[12rem] max-md:px-[0rem] max-md:my-[1rem] max-md:border-x-0 max-md:justify-normal max-lg:px-[1rem]">
						<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
							<p className=" text-text_gray font-light mb-[0.5rem]">
								First Name
							</p>
							<p className=" font-bold">{user?.first_name}</p>
						</div>
						<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
							<p className=" text-text_gray font-light mb-[0.5rem]">
								Last Name
							</p>
							<p className=" font-bold">{user?.surname}</p>
						</div>
						<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
							<p className=" text-text_gray font-light mb-[0.5rem]">
								Email address
							</p>
							<p className=" font-bold">{user?.email}</p>
						</div>
					</div>
				</div>
				<Link to="/account/edit" className=" max-md:hidden max-lg:pl-[1rem]">
					<FaUserEdit className=" text-primary mb-[0.1rem] text-2xl" />
					<p className="">Edit Profile</p>
				</Link>
			</div>

			<div className=" py-[1rem] border-b border-b-bluee flex justify-between max-md:border-b-0 max-md:flex-col">
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">
						Date of birth
					</p>
					<p className=" font-bold">
						{profData?.dob_string && profData?.dob_string}
					</p>
				</div>
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Gender</p>
					<p className=" font-bold">
						{profData?.gender_string && profData?.gender_string}
					</p>
				</div>
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Country</p>
					<p className=" font-bold">
						{profData?.country_string && profData?.country_string}
					</p>
				</div>
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Address</p>
					<p className=" font-bold">{profData?.address && profData?.address}</p>
				</div>
				<div className=" max-md:hidden"></div>
			</div>

			<div className="py-[1rem] border-b border-b-bluee flex justify-between max-md:border-b-0 max-md:flex-col">
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Height in cm</p>
					<p className=" font-bold">{medData?.height && medData?.height}cm</p>
				</div>
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Weight in kg</p>
					<p className=" font-bold">{medData?.weight && medData?.weight}kg</p>
				</div>
				<div className=" max-md:border-b max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]">Blood group</p>
					<p className=" font-bold">
						{medData?.blood_group && medData?.blood_group.group}
					</p>
				</div>
				<div className=" max-md:border-b-0 max-md:border-b-bluee max-md:w-full max-md:mb-[1rem]">
					<p className=" text-text_gray font-light mb-[0.5rem]"></p>
					<p className=" font-bold"></p>
				</div>
			</div>

			<form
				className=" grid pt-[2rem] w-[20rem]"
				onSubmit={handlePasswordUpdate}
			>
				<h1 className=" text-primary font-bold text-xl mb-[1rem]">
					Change Password
				</h1>

				<label
					htmlFor="oldPass"
					className=" text-sm text-text_gray mb-[0.5rem]"
				>
					Old Password
				</label>
				<div className="relative">
					<input
						type={isOld ? "text" : "password"}
						name="oldPass"
						id="oldPass"
						value={oldPass}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[1rem] w-full text-lg"
						onChange={(e) => setOldPass(e.target.value)}
					/>
					<div className=" absolute top-[0.7rem] right-[0.5rem]">
						{isOld ? (
							<BiHide onClick={() => setIsOld(!isOld)} />
						) : (
							<BiShow onClick={() => setIsOld(!isOld)} />
						)}
					</div>
				</div>

				<label
					htmlFor="newPass"
					className=" text-sm text-text_gray mb-[0.5rem]"
				>
					New Password
				</label>

				<div className="relative">
					<input
						type={isNew ? "text" : "password"}
						name="newPass"
						id="newPass"
						value={newPass}
						className=" border border-bluee bg-input_bg rounded-md p-[0.5rem] mb-[2rem] w-full text-lg"
						onChange={(e) => setNewPass(e.target.value)}
					/>
					<div className="absolute top-[0.7rem] right-[0.5rem]">
						{isNew ? (
							<BiHide onClick={() => setIsNew(!isNew)} />
						) : (
							<BiShow onClick={() => setIsNew(!isNew)} />
						)}
					</div>
				</div>

				<button className="bg-primary text-white py-[0.5rem] text-center w-full rounded-md">
					Update Password
				</button>
			</form>

			<div
				className=" items-center cursor-pointer text-black hidden max-md:flex mt-[2rem]"
				onClick={() => logout()}
			>
				<HiOutlineLogout className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem] text-black" />{" "}
				Logout
			</div>

			<div className=" flex justify-end max-md:justify-start">
				<Link
					to="/account/delete-account"
					className=" text-danger flex items-center max-md:mt-[2rem] cursor-pointer"
				>
					<p className=" mr-[1rem]">Delete Account</p>
					<BsPersonFillX className=" text-2xl " />
				</Link>
			</div>
		</div>
	);
};

export default Profile;
