import React, { useState } from "react";
import image from "assets/images/doc-img.png";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";

const Chat = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className=" w-[70%] mx-auto pt-[2rem] max-md:pt-[5rem] max-md:w-[90%]">
      {isModal && (
        <div className=" modal bg-black bg-opacity-90 fixed h-[100vh] w-[100vw] left-0 top-0 grid items-center z-[5]">
          <div className=" rounded-md bg-white py-[3rem] px-[1rem] w-[30rem] mx-auto relative text-center flex flex-col items-center max-md:w-[80%]">
            <h1
              className=" absolute right-[2rem] top-[1rem] cursor-pointer text-2xl"
              onClick={() => setIsModal(false)}
            >
              x
            </h1>

            <p className=" text-xl font-medium text-center">
              Click the button to chat with a general practitioner
            </p>
            <a href="https://wa.link/coox54">
              <button className=" bg-primary text-white border-2 border-primary rounded-md py-[0.5rem] px-[1rem] flex items-center mt-[2rem]">
                Chat on WhatsApp <BsWhatsapp className=" ml-[1rem]" />
              </button>
            </a>
          </div>
        </div>
      )}

      <h1 className=" fixed z-[10] text-2xl">A Doctor in Your Pocket!</h1>

      <p className=" text-lg w-[30rem] mt-[5rem] max-md:w-full">
        Need to speak to a doctor about the results from your vital sign
        assessment? Let’s connect you to certified doctors.
      </p>

      <div
        className=" bg-light_blue mt-[2rem] w-[20rem] cursor-pointer"
        onClick={() => setIsModal(true)}
      >
        <img
          src={image}
          alt=""
          className=" rounded-tl-sm rounded-tr-sm w-full object-cover"
        />
        <p className=" p-[1rem] text-xl font-Bold">
          Chat with a General Practitioner
        </p>
      </div>
    </div>
  );
};

export default Chat;
