import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts();
		const userInfo = localStorage.getItem("userInfo");
		if (userInfo) {
			setUser(JSON.parse(userInfo));
		}
	}, [fetchProducts]);
	console.log("products", products);
	console.log("User", user);

	return (
		<div className="max-w-6xl mx-auto p-6 relative">
			{/* 註冊/登入按鈕 */}
			<div className="absolute top-6 right-6">
				{user ? (
					<div className="flex items-center space-x-4">
						<span className="text-lg font-semibold text-gray-700">Hi, {user.name} 👋</span>
                        {console.log('Login user:', user.name)}
						<button onClick={() => {
							localStorage.removeItem("userInfo");
							setUser(null);
							navigate("/");
						}} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
							Logout
						</button>
					</div>
				) : (
					<div className="flex space-x-2">
						<Link to="/login">
							<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
								Login
							</button>
						</Link>
						<a href="http://localhost:5003/register">
							<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
								Register
							</button>
						</a>
					</div>
				)}
			</div>
		
			<div className="flex flex-col items-center space-y-8">
				<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
					Current Products 🚀
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>

				{products.length === 0 && (
					<p className="text-xl font-bold text-gray-500 text-center">
						No products found 😢{" "}
						<Link to={"/create"} className="text-blue-500 hover:underline">
							Create a product
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};
export default HomePage;
