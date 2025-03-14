import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; 

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors()); 

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

//
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server started at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// // 🔥 開發模式下的測試路由
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}