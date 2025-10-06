import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// (Sign In)
export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ success: false, message: "Please fill in all fields" });
	}

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ success: false, message: "This email has already been registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword });

		await newUser.save(); // Save to database to ensure newUser._id exists

		// Generate token and save to MongoDB
		const token = generateToken(newUser._id);
		newUser.token = token;
		await newUser.save(); // Update token

		console.log("✅ New user registered:", newUser);

		res.status(201).json({
			success: true,
			message: "Registration successful",
			redirect: "/"
		});
	} catch (error) {
		console.error("Error in register user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// 🟢 (Login)
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ success: false, message: "Please enter email and password" });
	}

	try {
		const user = await User.findOne({ email });

		console.log("User found:", user); // Debugging

		if (!user) {
			return res.status(401).json({ success: false, message: "Account name or password is not correct" });
		}

		console.log("User password:", user.password); // Debugging

		if (!user.password) {
			return res.status(500).json({ success: false, message: "User password not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		console.log("Password match:", isMatch); // Debugging

		if (!isMatch) {
			return res.status(401).json({ success: false, message: "Account name or password is not correct" });
		}

		// Update lastLogin time (if the field exists)
		user.lastLogin = new Date();
		const token = generateToken(user._id);
		user.token = token;
		await user.save();

		res.status(200).json({
			success: true,
			message: "Successfully Login",
			user: { name: user.name, email: user.email },
			redirect: "/"
		});
	} catch (error) {
		console.error("Error in login user:", error);
		res.status(500).json({ success: false, message: "Server Error", error: error.message });
	}
};

// 🟢 User Logout
export const logoutUser = (req, res) => {
	res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

	res.json({
		success: true,
		message: "Log out successfully"
	});
};

// 🟢 Get all users (GET /api/auth/users)
export const getUsers = async (req, res) => {
	console.log("Fetching all users..."); // Debugging

	try {
		const users = await User.find().select("-password -token");
		console.log("Users found:", users); // Debugging
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.error("Error fetching users:", error.message);
		res.status(500).json({ success: false, message: "Server Error", error: error.message });
	}
};

// 🟢 Get user by ID (GET /api/auth/users/:id)
export const getUserById = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		const user = await User.findById(id).select("-password -token");
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.error("Error fetching user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// 🟢 Update user information (PUT /api/auth/users/:id)
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		user.name = name || user.name;
		user.email = email || user.email;

		if (password) {
			user.password = await bcrypt.hash(password, 10);
		}

		await user.save();
		res.status(200).json({ success: true, message: "User updated successfully", data: user });
	} catch (error) {
		console.error("Error updating user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// 🟢 Get user by name (GET /api/auth/users)
export const getUserByName = async (req, res) => {
	console.log("Received request with query:", req.query); // 🔍 Debug

	const { name } = req.query;
	if (!name) {
		return res.status(400).json({ success: false, message: "Please provide username" });
	}

	try {
		const user = await User.findOne({ name }).select("-password");
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.error("Error fetching user by name:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};