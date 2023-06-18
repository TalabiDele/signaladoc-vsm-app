import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { toast } from "react-hot-toast";

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, userId } = useContext(AuthContext);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("All fields are required!", {
        duration: 6000,
      });
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        duration: 6000,
      });
    } else {
      resetPassword({ userId, password });
    }
  };

  return (
    <div>
      <div className=" bg-white w-[50vw] max-lg:w-[100vw] h-[100vh]">
        <div className=" grid w-[80%] mx-auto">
          <h1 className=" font-bold text-2xl mb-[0.5rem] text-text_gray">
            Reset Password
          </h1>
          <p className=" mb-[3rem] text-text_gray">
            Enter the password reset code sent to your email or phone number
          </p>

          <form action=" grid w-[90%]" onSubmit={handleResetPassword}>
            <div className=" mb-[1rem]">
              <label htmlFor="password" className=" text-text_gray mb-[0.2rem]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem]"
                placeholder="******"
              />
            </div>
            <div className=" mb-[1rem]">
              <label
                htmlFor="confirmPassword"
                className=" text-text_gray mb-[0.2rem]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" text-lg px-[1rem] py-[0.5rem] w-full border border-input_border rounded-lg mt-[0.5rem]"
                placeholder="******"
              />
            </div>
            <button className=" bg-primary text-white border border-primary py-[1rem] rounded-lg w-full">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
