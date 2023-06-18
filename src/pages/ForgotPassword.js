import Forgot from "components/Forgot";
import React, { useContext } from "react";
import ForgotBanner from "components/ForgotBanner";
import { Redirect } from "react-router-dom";
import AuthContext from "components/context/AuthContext";

const ForgotPassword = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Redirect to="/home" />}
      <div className=" flex fixed w-[100vw] justify-between">
        <Forgot />
        <ForgotBanner />
      </div>
    </>
  );
};

export default ForgotPassword;
