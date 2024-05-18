import express from 'express'
import { protectRoute } from '../protectedRoute/protectRoute.js'
import { signup, login, logout, authUser } from '../controllers/auth.js';

const router = express.Router();

router.post("/authUser", protectRoute, authUser);
router.post("/login", protectRoute, login);
router.post("/logout", protectRoute,  logout);
router.post("/signup",protectRoute , signup);




export default router;