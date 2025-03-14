import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const Navbar = () => {
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("theme") === "dark"
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleColorMode = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		localStorage.setItem("theme", newMode ? "dark" : "light");
		document.documentElement.classList.toggle("dark", newMode);
	};

	return (
		<div className="max-w-5xl mx-auto bg-gray-50 p-4 rounded-lg shadow-sm">
			<div className="flex flex-col sm:flex-row items-center justify-between h-16">
				<h1 className="text-lg sm:text-2xl font-bold uppercase text-center bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
					<Link to={"/"}>Product Store 🌿</Link>
				</h1>

				<div className="flex items-center gap-2">
					<Link to={"/create"}>
						<button className="p-2 bg-teal-400 text-white rounded-full hover:bg-teal-500 transition">
							<PlusSquareIcon fontSize={20} />
						</button>
					</Link>
					<button
						onClick={toggleColorMode}
						className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 transition"
					>
						{darkMode ? <LuSun size={20} /> : <IoMoon size={20} />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
