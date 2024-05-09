import express from 'express';
import dotenv from "dotenv";

import authRoutes from './routes/authRoutes.js'
import mongoDb from './db/mongodb.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended :true}));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    mongoDb();
})