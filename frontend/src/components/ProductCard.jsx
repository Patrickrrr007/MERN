import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [isOpen, setIsOpen] = useState(false);

	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (pid) => {
		await deleteProduct(pid);
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		await updateProduct(pid, updatedProduct);
		setIsOpen(false);
	};

	return (
		<div className="shadow-md rounded-lg bg-gray-50 p-5 transition hover:shadow-lg">
			<img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-md" />

			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-700 mb-2">{product.name}</h3>
				<p className="text-xl font-bold text-gray-500 mb-4">${product.price}</p>

				<div className="flex space-x-2">
					<button onClick={() => setIsOpen(true)} className="p-2 bg-teal-400 text-white rounded-full hover:bg-teal-500 transition">
						<EditIcon />
					</button>
					<button onClick={() => handleDeleteProduct(product._id)} className="p-2 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition">
						<DeleteIcon />
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-gray-50 p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4 text-gray-700">Update Product</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Product Name"
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="number"
								placeholder="Price"
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<div className="flex justify-end mt-4 space-x-2">
							<button onClick={() => handleUpdateProduct(product._id, updatedProduct)} className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition">
								Update
							</button>
							<button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductCard;
