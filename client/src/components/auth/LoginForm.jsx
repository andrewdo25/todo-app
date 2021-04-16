import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
	// Context, get loginUser of AuthContext in contexts folders
	const { loginUser } = useContext(AuthContext);

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});

	const { username, password } = loginForm;
	const onChangeLoginForm = (event) => {
		// Tu dong thay name thanh username neu dang nhap username, thanh password neu dang nhap password
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
	};

	const [alert, setAlert] = useState(null);

	const login = async (event) => {
		event.preventDefault();

		try {
			const loginData = await loginUser(loginForm);
			if (loginData.success) {
				// history.push("/dashboard");
			} else {
				setAlert({
					type: "danger",
					// lay luon message tu respone
					message: loginData.message,
				});
				setTimeout(() => setAlert(null), 5000);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Form className="my-4" onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to="/register">
					<Button variant="info" size="sm" className="ml-2">
						Register
					</Button>
				</Link>
			</p>
		</>
	);
};

export default LoginForm;
