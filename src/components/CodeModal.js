import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const CodeModal = ({ contact }) => {
  const [code, setCode] = useState();
  const {
    emailCode,
    setEmailCode,
    isCode,
    setIsCode,
    setError,
    error,
    message,
    setMessage,
    approved,
    setApproved,
    setIsEmail,
    setIsDetails,
    codeResend,
    userId,
  } = useContext(AuthContext);

  //   const notify = () => toast(message);

  const handleCode = (e) => {
    e.preventDefault();

    if (code === "") {
      setError(true);
      toast.error("Enter code sent to your email", {
        duration: 6000,
      });
    } else if (code !== emailCode) {
      setError(true);
      toast.error("Code does not match, try again!", {
        duration: 6000,
      });
    } else if (code === emailCode) {
      setApproved(true);
      setIsEmail(false);
      setIsDetails(true);
      toast.success("Email verified!", {
        duration: 6000,
      });
    }
  };

  const handleResend = () => {
    codeResend({ userId });
  };

  return (
    <div className=" w-[100vw] bg-black bg-opacity-[0.5] fixed top-0 bottom-0 left-0 right-0 grid items-center z-[100]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative w-[40rem] mx-auto bg-white rounded-lg shadow-lg p-[2rem] max-md:w-[90%]">
        <div className="flex justify-between items-center mb-[2rem]">
          <h1 className=" text-lg font-bold ">
            We sent a verification code to {contact}
          </h1>
          <h1
            className=" font-bold cursor-pointer text-3xl"
            onClick={() => setIsCode(false)}
          >
            x
          </h1>
        </div>
        <form className="" onSubmit={handleCode}>
          <label htmlFor="number" className=" mb-[1rem]">
            Enter verification code
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-lg p-[1rem] w-full border border-primary rounded-lg my-[0.5rem]"
            placeholder="123456"
          />
          <p className=" italic text-md">
            Didn’t receive it?{" "}
            <span
              className=" underline cursor-pointer italic"
              onClick={() => handleResend()}
            >
              Resend
            </span>
          </p>

          <button className=" bg-primary text-white py-[1rem] w-[50%] rounded-lg text-lg mt-[2rem]">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeModal;
