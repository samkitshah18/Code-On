import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signup, login, logout, useAuth } from "../../firebase";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const currentUser = useAuth();

	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	async function handleSignup() {
		setLoading(true);
		try {
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/code-on");
		} catch {
			alert("Error!");
		}
		setLoading(false);
	}

	async function handleLogin() {
		setLoading(true);
		try {
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/code-on");
		} catch {
			alert("Error!");
		}
		setLoading(false);
	}



	return (
		<>
			<div>Currently logged in as: {currentUser?.email} </div>

			<div id="fields">
				<input ref={emailRef} placeholder="Email" />
				<input ref={passwordRef} type="password" placeholder="Password" />
			</div>

			<button disabled={loading || currentUser} onClick={handleSignup}>Sign Up</button>
			<button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
			{/* <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button> */}
		</>
	)
}

export default Login
