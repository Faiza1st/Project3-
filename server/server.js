import path from "path";
import.meta.dirname; 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import mongoDb from "./db/mongodb.js";
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloud_API_key,
  api_secret: process.env.Cloud_API_secret,
});

const app = express();
const PORT = process.env.PORT || 4050;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:4000", // frontend URL
//     credentials: true, // Allow credentials (cookies) to be included
//   })
//);
// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  mongoDb();
});
