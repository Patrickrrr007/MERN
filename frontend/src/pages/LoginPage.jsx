import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();
			console.log("Login API Response:", data);

			if (res.ok && data.user && data.user.name) {
				localStorage.setItem(
					"userInfo",
					JSON.stringify({
						name: data.user.name,
						email: data.user.email,
					})
				);
				setMessage("Login Successful!");
			} else {
				alert(data.message || "Login failed, please check your credentials.");
			}
		} catch (error) {
			console.error("Login Error:", error);
			alert("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold text-center mb-4">Login</h2>
			{message ? (
				<div className="text-center">
					<p className="mb-4 text-green-600 font-semibold">{message}</p>
					<button 
						onClick={() => navigate("/")} 
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					>
						Return to homepage
					</button>
				</div>
			) : (
				<form onSubmit={handleLogin} className="space-y-4">
					<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
					<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
				</form>
			)}
		</div>
	);
};

export default LoginPage;