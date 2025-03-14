import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("❌ JWT_SECRET 未定義，請檢查 .env 是否正確設置");
    }

    console.log("✅ JWT_SECRET is loaded");

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default generateToken;