import express from 'express'
import { protectRoute } from '../protectedRoute/protectRoute.js'
import { signup, login, logout, authMe } from '../controllers/auth.js';

const router = express.Router();

router.get("/authMe", protectRoute, authMe);
router.post("/login", login);
router.post("/logout",  logout);
router.post("/signup", signup);




export default router;