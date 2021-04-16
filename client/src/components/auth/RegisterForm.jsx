import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
	// Context
	const { registerUser } = useContext(AuthContext);

	// state

	const [registerForm, setRegisterForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const { username, password, confirmPassword } = registerForm;

	const onChangeRegisterForm = (event) => {
		// Tu dong thay name thanh username neu dang nhap username, thanh password neu dang nhap password
		setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
	};

	const [alert, setAlert] = useState(null);

	const register = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setAlert({
				type: "danger",
				message: "Confirm password not match",
			});
			setTimeout(() => setAlert(null), 5000);
			return;
		}

		try {
			const registerData = await registerUser(registerForm);
			if (registerData.success) {
				// history.push("/dashboard");
			} else {
				setAlert({
					type: "danger",
					// lay luon message tu respone
					message: registerData.message,
				});
				setTimeout(() => setAlert(null), 5000);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Form className="my-4" onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						required
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to="/login">
					<Button variant="info" size="sm" className="ml-2">
						Login
					</Button>
				</Link>
			</p>
		</>
	);
};

export default RegisterForm;
