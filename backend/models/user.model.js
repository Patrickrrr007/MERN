import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"; 

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }, 
		token: { type: String }, 
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;