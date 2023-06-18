import React, { useContext } from "react";
import logo from "../assets/images/vsm-white.png";
import { Link } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { BiBookReader } from "react-icons/bi";
import { TfiTarget } from "react-icons/tfi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { TbCalendarTime } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import AuthContext from "../components/context/AuthContext";
import "./General.scss";

const UserNav = () => {
  const pathname = window.location.pathname;

  const { user, logout, medData, profData } = useContext(AuthContext);
  console.log(medData);
  console.log(profData);

  return (
    <div className=" text-white fixed z-[3] flex w-[100vw] h-[10vh] max-md:h-[5vh]">
      <div className=" bg-primary h-[100vh] w-[15rem] p-[2rem] max-md:h-[10vh] max-md:w-[100vw] max-md:fixed max-md:bottom-0 max-md:p-[1rem]">
        <div className=" ">
          <Link to="/home">
            <img
              src={logo}
              alt=""
              className=" w-[10rem] object-cover mb-[10rem] max-md:hidden"
            />
          </Link>
          <div className=" flex flex-col justify-between h-[60vh] max-md:h-full">
            <ul className=" flex flex-col justify-between h-[15rem] text-xl max-md:flex-row max-md:h-full max-md:w-[90vw] max-md:mx-auto">
              <li className={`${pathname === "/home" && " bold"}`}>
                <Link
                  to={"/home"}
                  className={`${
                    pathname === "/home" && "bold"
                  } flex items-center text-white hover:text-white hover:bold transition ease-in-out duration-300 light max-md:flex-col max-md:text-sm`}
                >
                  <SlHome className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem]" />{" "}
                  Home
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/learn"}
                  className={` ${
                    pathname === "/learn" && "bold"
                  } flex items-center text-white hover:text-white transition ease-in-out duration-300 light max-md:flex-col max-md:text-sm`}
                >
                  <BiBookReader className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem]" />{" "}
                  Learn
                </Link>
              </li>
              <li className="">
                <Link
                  to={`/capture/?weight=${medData?.weight}&height=${medData?.height}&age=${profData?.age}`}
                  className={`${
                    pathname === "/capture" && "bold"
                  } flex items-center text-white hover:text-white transition ease-in-out duration-300 light max-md:flex-col max-md:text-sm`}
                >
                  <TfiTarget className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem]" />{" "}
                  Capture
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/plans"}
                  className={`${
                    pathname === "/plans" && "bold"
                  } flex items-center text-white hover:text-white transition ease-in-out duration-300 light max-md:flex-col max-md:text-sm`}
                >
                  <RiExchangeDollarLine className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem]" />{" "}
                  Plans
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/account"}
                  className={`${
                    pathname === "/account" && "bold"
                  } flex items-center text-white hover:text-white transition ease-in-out duration-300 light max-md:flex-col max-md:text-sm`}
                >
                  <FiUser className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem]" />{" "}
                  Account
                </Link>
              </li>
            </ul>

            <div
              className=" flex items-center cursor-pointer max-md:hidden"
              onClick={() => logout()}
            >
              <HiOutlineLogout className=" mr-[0.5rem] max-md:mr-0 max-md:text-3xl max-md:mb-[0.5rem] " />{" "}
              Logout
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white text-black w-full flex justify-end text-xl p-[2rem] max-md:p-[2rem]">
        <div className=" flex w-[30vw] justify-between items-center max-md:w-[20vw] max-lg:w-[40vw]">
          <TbCalendarTime className=" text-3xl max-md:text-4xl light" />
          <MdNotificationsNone className=" text-3xl max-md:text-4xl light" />
          <div className=" flex items-center max-md:hidden">
            <div className=" bold bg-[#AEC5F1] rounded-md py-[0.5rem] px-[1rem] max-md:px-[0.5rem] max-md:py-[0.1rem] mr-[1rem] ">
              {user.first_name.charAt(0)}
            </div>
            <p className=" max-md:text-lg">Hi {user.first_name}, Welcome</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
