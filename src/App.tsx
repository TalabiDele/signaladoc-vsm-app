// https://fluentsite.z22.web.core.windows.net/quick-start
import React, { useContext, useEffect } from "react";
import { Loader } from "@fluentui/react-northstar";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import { TeamsTheme } from "@fluentui/react-teams/lib/cjs/themes";
import { Provider } from "@fluentui/react-teams";
import {
	Capture,
	NotSupported,
	BadConditions,
	Results,
	// ResultsPage,
} from "tabs/CaptureTab/Views";
import "./App.scss";
import Home from "pages/Home";
import Nav from "components/Nav";
import Register from "pages/Register";
import { AuthProvider } from "components/context/AuthContext";
import Login from "pages/Login";
import { createBrowserHistory } from "history";
import ForgotPassword from "pages/ForgotPassword";
import { Toaster, toast } from "react-hot-toast";
import UserNav from "components/UserNav";
import Dashboard from "pages/Dashboard";
import AuthContext from "components/context/AuthContext";
import Account from "pages/Account";
import Edit from "pages/Edit";
import ChatDoc from "pages/ChatDoc";
import HistoryPage from "pages/HistoryPage";
import Delete from "pages/Delete";
import Plans from "pages/Plans";
import PlansNav from "components/PlansNav";
import Explore from "pages/Explore";
import Discounts from "pages/Discounts";
import SubHistory from "pages/SubHistory";
import Individual from "pages/Individual";
import Payment from "pages/Payment";
import Corperate from "pages/Corperate";
import Onboard from "pages/Onboard";
import Enrollee from "pages/Enrollee";
import BankDiscount from "pages/BankDiscount";
import { useServiceWorker } from "useServiceWorker";
import Buttons from "components/Buttons";
import LoaderComponent from "components/LoaderComponent";
// import ResultsPage from "tabs/CaptureTab/Views/Results/ResultsPage";
// import { AnimatePresence } from "framer-motion";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
	const { loading, theme, themeString, teamsfx } = useTeamsFx();

	const hist = createBrowserHistory();

	const { waitingWorker, showReload, reloadPage } = useServiceWorker();
	// decides when to show the toast
	useEffect(() => {
		if (showReload && waitingWorker) {
			toast((t) => (
				<span>
					A new version of this page is available
					{/* <button onClick={() => reloadPage()}>REFRESH</button> */}
					<Buttons
						bg={"bg-primary"}
						border={"border-2 border-primary"}
						color={"text-white"}
						text={"Refresh"}
						px={"px-[5rem]"}
						resonsive={false}
						event={() => reloadPage()}
					/>
				</span>
			));
		}
	}, [waitingWorker, showReload, reloadPage]);

	const { user, logout, isLoading } = useContext(AuthContext);

	console.log(user);

	const pathname = window.location.pathname;

	useEffect(() => {
		// window.addEventListener("beforeunload", function (e) {
		// 	e.preventDefault();
		// 	console.log(pathname);
		// 	if (pathname !== "/plans") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/account/edit") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/history") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/capture/") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/capture/results") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/capture/results/doctor") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/home") {
		// 		logout();
		// 	}
		// 	if (pathname !== "/account") {
		// 		logout();
		// 	}
		// });
	}, []);

	return (
		<div className="font-face">
			{/* <TeamsFxContext.Provider value={{ theme, themeString, teamsfx }}> */}
			{/* <Provider themeName={TeamsTheme.Default} lang="en-US"> */}
			<Toaster position="top-center" reverseOrder={false} />
			{isLoading && <LoaderComponent />}
			{user && pathname !== "/" ? <UserNav /> : <></>}
			{/* {pathname === "/plans" ||
				pathname === "/plans/explore" ||
				pathname === "/plans/history" ||
				(pathname === "/plans/discounts" && <PlansNav />)} */}
			{loading ? (
				<Loader style={{ margin: 100 }} />
			) : (
				<>
					{user && (
						<>
							<Route
								path={`/capture`}
								render={({ match: { url } }) => (
									<>
										<Route exact path={`${url}/`} component={Capture} />
										<Route
											exact
											path={`${url}/not-supported`}
											component={NotSupported}
										/>
										<Route
											exact
											path={`${url}/bad-conditions`}
											component={BadConditions}
										/>
										<Route exact path={`${url}/results`} component={Results} />
										<Route
											exact
											path={`${url}/results/doctor`}
											component={ChatDoc}
										/>
									</>
								)}
							/>
							<Route exact path={`/history`} component={HistoryPage} />

							<Route path="/home" component={Dashboard} />
							<Route
								path={`/plans`}
								render={({ match: { url } }) => (
									<>
										<>
											<PlansNav />
											<Route exact path={`${url}/`} component={Plans} />
											<Route
												exact
												path={`${url}/explore`}
												component={Explore}
											/>
											<Route
												exact
												path={`${url}/discounts`}
												component={Discounts}
											/>
											<Route
												exact
												path={`${url}/history`}
												component={SubHistory}
											/>
										</>
										<Route
											exact
											path={`/plans/individual`}
											component={Individual}
										/>
										<Route
											exact
											path={`/plans/payment-summary`}
											component={Payment}
										/>
										<Route
											exact
											path={`/plans/enrollee`}
											component={Enrollee}
										/>
										<Route
											exact
											path={`/plans/discounts/:slug`}
											component={BankDiscount}
										/>
									</>
								)}
							/>

							<Route
								path="/account"
								render={({ match: { url } }) => (
									<>
										<Route exact path={`${url}/`} component={Account} />
										<Route path={`${url}/edit`} component={Edit} />
										<Route path={`${url}/delete-account`} component={Delete} />
									</>
								)}
							/>
						</>
					)}
				</>
			)}

			<Route exact path={`/`} component={Home} />
			<Route exact path={`/plans/corporate`} component={Corperate} />
			<Route exact path={`/plans/onboard`} component={Onboard} />
			{/* <Route exact path={`/capture/results`} component={ResultsPage} /> */}
			<>
				<Route exact path={`/login`} component={Login} />
				<Route exact path={`/register`} component={Register} />
				<Route exact path={`/forgot-password`} component={ForgotPassword} />
			</>
			{/* </Provider> */}
			{/* </TeamsFxContext.Provider> */}
		</div>
	);
}
