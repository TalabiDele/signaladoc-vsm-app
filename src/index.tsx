import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import "./index.css";
import "./tailwind.scss";
import "./fonts/VisbyCF/VisbyCF-Bold.otf";
import "./fonts/VisbyCF/VisbyCF-Regular.otf";
import "./fonts/VisbyCF/VisbyCF-RegularOblique.otf";
import { AuthProvider } from "components/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

serviceWorkerRegistration.register();

reportWebVitals();
/* 
Tasks
  - Keep me logged in modal
  - Add react share
  - History pagination
  - PWA
*/
