import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signup, login, logout, useAuth, addUser } from "../../firebase";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const currentUser = useAuth();

	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	async function handleSignup() {
		setLoading(true);
		try {
			const loginData = await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
			addUser(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
			console.log("Signup: ", loginData);
			const userEmail = loginData.user.email
			localStorage.setItem("userInfo", JSON.stringify(userEmail))
			navigate("/code-on");
		} catch (e) {
			alert(e);
		}
		setLoading(false);
	}

	async function handleLogin() {
		setLoading(true);
		try {
			const loginData = await login(emailRef.current.value, passwordRef.current.value);
			console.log("Login: ", loginData);
			const userEmail = loginData.user.email
			localStorage.setItem("userInfo", JSON.stringify(userEmail))
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
				<input ref={nameRef} placeholder="Name" />
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
