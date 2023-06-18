import AccountBanner from "components/AccountBanner";
import Signup from "components/Signup";
import React, { useContext, useEffect } from "react";
import AuthContext from "components/context/AuthContext";
import CreateUser from "components/CreateUser";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { isEmail, isDetails, user } = useContext(AuthContext);

  return (
    <>
      {user && <Redirect to="/home" />}
      <div className=" flex fixed w-[100vw] justify-between">
        {isEmail && <Signup />}
        {isDetails && <CreateUser />}
        <AccountBanner />
      </div>
    </>
  );
};

export default Register;
