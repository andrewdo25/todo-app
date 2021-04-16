import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	// Check Authenticate User
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}

		try {
			const response = await axios.get(apiUrl + "/auth");
			if (response.data.success) {
				dispatch({
					type: "SET_AUTH",
					payload: { isAuthenticated: true, user: response.data.user },
				});
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({
				type: "SET_AUTH",
				payload: { isAuthenticated: false, user: null },
			});
		}
	};

	useEffect(() => loadUser(), []);

	// Login

	const loginUser = async (userForm) => {
		try {
			// lay data tu formlogin de post
			const response = await axios.post(apiUrl + "/auth/login", userForm);
			if (response.data.success)
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

			// de ve set lai data khi login => render ve dashboard
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return error.response;
		}
	};

	// Logout

	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		dispatch({
			type: "SET_AUTH",
			payload: { isAuthenticated: false, user: null },
		});
	};

	// Register

	const registerUser = async (userForm) => {
		try {
			const response = await axios.post(apiUrl + "/auth/register", userForm);
			if (response.data.success)
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return error.response;
		}
	};

	// context Data

	const authContextData = { loginUser, logoutUser ,registerUser, authState };

	// return Provider
	return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
