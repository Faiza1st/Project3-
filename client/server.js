import express from 'express';
import authRoutes from './routes/authRoutes.js'
const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    console.log('Server started on port 8000');
})