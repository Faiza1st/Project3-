import express from 'express'
import { signup, login, logout } from '../controllers/auth.js';
const router = express.Router();

// router.post("/authUser", protectRoute, authUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);




export default router;