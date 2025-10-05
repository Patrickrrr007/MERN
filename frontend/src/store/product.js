import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const API_URL = import.meta.env.VITE_API_URL || "/api";
			const res = await fetch(`${API_URL}/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});
			const data = await res.json();
			
			if (!data.success) {
				return { success: false, message: data.message || "Failed to create product" };
			}
			
			// 更新本地狀態
			set((state) => ({ products: [...state.products, data.data] }));
			console.log("Product created successfully");
			return { success: true, message: "Product created successfully" };
		} catch (error) {
			console.error("Error creating product:", error);
			return { success: false, message: "Network error. Please try again." };
		}
	},
	fetchProducts: async () => {
		try {
			const API_URL = import.meta.env.VITE_API_URL || "/api";
			const res = await fetch(`${API_URL}/products`);
			const data = await res.json();
			if (data.success) {
				set({ products: data.data });
			} else {
				console.error("Failed to fetch products:", data.message);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	},
	deleteProduct: async (pid) => {
		const API_URL = import.meta.env.VITE_API_URL || "/api";
		const res = await fetch(`${API_URL}/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const API_URL = import.meta.env.VITE_API_URL || "/api";
		const res = await fetch(`${API_URL}/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
