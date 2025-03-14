import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		const data = await res.json();
		if (res.ok) {
			localStorage.setItem("userInfo", JSON.stringify(data));
			navigate("/");
		} else {
			alert(data.message);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold text-center mb-4">Register</h2>
			<form onSubmit={handleRegister} className="space-y-4">
				<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;