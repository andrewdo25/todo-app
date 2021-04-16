import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/DashBoard";
import About from "./views/About";
import AuthContextProvider from "./contexts/AuthContext";
import PostConTextProvider from "./contexts/PostContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

class App extends React.Component {
	render() {
		return (
			<AuthContextProvider>
				<PostConTextProvider>
					{/* children */}
					<Router>
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route
								exact
								path="/login"
								render={(props) => <Auth {...props} authRouter="login" />}
							/>
							<Route
								exact
								path="/register"
								render={(props) => <Auth {...props} authRouter="register" />}
							/>
							<ProtectedRoute exact path="/dashboard" component={Dashboard} />
							<ProtectedRoute exact path="/about" component={About} />
						</Switch>
					</Router>
				</PostConTextProvider>
			</AuthContextProvider>
		);
	}
}

export default App;
