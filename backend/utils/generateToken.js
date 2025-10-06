import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET is not defined, please check if .env is properly configured");
    }

    console.log("✅ JWT_SECRET is loaded");

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default generateToken;