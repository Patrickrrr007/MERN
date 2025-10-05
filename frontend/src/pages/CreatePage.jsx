import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const { createProduct, fetchProducts } = useProductStore();
	const navigate = useNavigate();

	const handleAddProduct = async () => {
		const result = await createProduct(newProduct);
		if (result.success) {
			// 重新獲取產品列表
			await fetchProducts();
			// 清空表單
			setNewProduct({ name: "", price: "", image: "" });
			// 跳轉回主頁
			navigate("/");
		} else {
			alert(result.message || "Failed to create product");
		}
	};

	return (
		<div className="max-w-lg mx-auto mt-10">
			<h1 className="text-3xl font-bold text-center mb-8">Create New Product</h1>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Product Name"
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className="w-full p-2 border rounded"
					/>
					<input
						type="number"
						placeholder="Price"
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						className="w-full p-2 border rounded"
					/>
					<input
						type="text"
						placeholder="Image URL"
						value={newProduct.image}
						onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						className="w-full p-2 border rounded"
					/>

					<button
						onClick={handleAddProduct}
						className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Add Product
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
