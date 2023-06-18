import AccountBanner from "components/AccountBanner";
import Signin from "components/Signin";
import AuthContext from "components/context/AuthContext";
import React, { useEffect, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Redirect to="/home" />}
      <div className="flex fixed w-[100vw] justify-between">
        <Signin />
        <AccountBanner />
      </div>
    </>
  );
};

export default Login;
